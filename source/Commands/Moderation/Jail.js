const { Discord, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../../Configurations/Server_Settings");
const Point = require("../../Schemas/PenalPoint");
const Roles = require('../../Schemas/JailRoles');
const Penal = require("../../Schemas/Penal");
const moment = require("moment");
moment.locale("tr");

module.exports = {
	config: {
		aliases: ["jail", "karantina"],
		name: "Jail",
		help: "jail [@Shainey/ID] [Sebep]",
		enabled: true,
        staffLevel: 4
	},

	run: async ({ client, message, args, embed }) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.reply({ embeds: [embed.setDescription(`${message.author}, Bir kullanıcı belirt.`)] }).then(message.react(config.Others.Emojis.reject)).sil(3);

        if (member.roles.cache.has(config.Roles.Jailed)) return message.reply({ embeds: [embed.setDescription(`${message.author}, Belirtilen kullanıcıda devam eden bir jail cezası mevcut.`)] }).then(message.react(config.Others.Emojis.reject)).sil(3);

        const reason = args.slice(1).join(" ") || "Belirtilmedi.";
        if (message.member.roles.highest.position <= member.roles.highest.position) return message.reply({ embeds: [embed.setDescription(`${message.author}, Bu kullanıcıya herhangi bir işlem uygulayamam.`)] }).then(message.react(config.Others.Emojis.reject)).sil(3);
        if (!member.manageable) return message.reply({ embeds: [embed.setDescription(`${message.author}, Kullanıcıya Jail işlemi uygulayamıyorum.`)] }).then(message.react(config.Others.Emojis.reject)).sil(3);

        let row = new MessageActionRow()
        .addComponents(new MessageButton()
        .setStyle("SUCCESS")
        .setLabel("Evet")
        .setCustomId("evet"))
        .addComponents(new MessageButton()
        .setStyle("DANGER")
        .setLabel("Hayır")
        .setCustomId("hayir"))

        let msg = await message.reply({ embeds: [ embed.setDescription(`${message.member}, ${member} üyesini gerçekten karantinaya almak istiyor musunuz?`) ], components: [row] })
        var filter = (interaction) => interaction.member.id === message.member.user.id
        const collector = msg.createMessageComponentCollector({ filter, time: 15000 });

        collector.on("collect", async (interaction) => {
                if (interaction.member.id !== message.member.user.id) return interaction.reply({ content: `Başka bir kullanıcıya ait etkileşimi kullanamazsın.`, ephemeral: true });

                if (interaction.customId === "evet") {

                        await Roles.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { Roles: member.roles.cache.map(x => x.id) } }, { upsert: true });
                        await Point.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { point: config.Others.Points.Jail } }, { upsert: true });
                        await Penal.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { penal: 1 } }, { upsert: true });
                        await Penal.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });

                        await message.guild.members.cache.get(member.id).setRoles(config.Roles.Member.jailRole);

                        const penal = await client.penal(message.guild.id, member.user.id, "JAIL", true, message.author.id, reason);

                        message.reply({ content: `Kullanıcı \`${reason}\` sebebiyle Jail'a atıldı. (\`Ceza ID: #${penal.id}\`)` }).then(message.react(config.Others.Emojis.check)).sil(8);
                
                        const log = embed.setThumbnail(member.user.avatarURL({ dynamic: true })).setDescription(`
                        > ${member.toString()} - \`${member.id}\` Karantinaya alındı.
                        
                        • Kullanıcı: ${member ? member.toString() : "undefined"} - (\`${member.id}\`)
                        • Yetkili: ${message.author} - (\`${message.author.id}\`)
                        • Sebep: \`${reason}\`
                        
                        → Jail'a Atılma Tarihi: \`${moment(Date.now()).format("LLL")}\`
                        `)
                        
                        client.channels.cache.get(config.Channels.jailLogChannel).send({ embeds: [log] })

                } else if (interaction.customId === "hayir") {
                    if (interaction.member.id !== message.member.user.id) return interaction.reply({ content: `Başka bir kullanıcıya ait etkileşimi kullanamazsın.`, ephemeral: true })
                    message.channel.send({ content:'İşlem iptal edildi.' }).then(message.react(config.Others.Emojis.reject)).sil(3)
                } 
            });
}};