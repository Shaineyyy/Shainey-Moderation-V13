const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../../Configurations/Server_Settings");
const pointSchema = require("../../Schemas/PenalPoint");
const penalSchema = require("../../Schemas/Penal");
const penals = require("../../Schemas/Penals");
const moment = require("moment");
const ms = require("ms");
moment.locale("tr");

module.exports = {
  config: {
		aliases: ["mute", "chatmute", "chat-mute", "cmute"],
		name: "Mute",
		help: "mute [@Shainey/ID] [Süre] [Sebep]",
		enabled: true,
        staffLevel:2
	},

	run: async ({ client, message, args, embed }) => {
    
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.reply({ embeds: [embed.setDescription(`${message.author}, Bir kullanıcı belirt.`)]}).then(message.react(config.Others.Emojis.reject)).sil(3);
  
    if (member.roles.cache.has(config.Roles.Member.MutedRole)) return message.reply({ embeds: [embed.setDescription(`${message.author}, Kullanıcı zaten susturulmuş.`)] }).then(message.react(config.Others.Emojis.reject)).sil(3);

    const duration = args[1] ? ms(args[1]) : undefined;
    if (!duration) return message.reply({ embeds: [embed.setDescription(`${message.author}, Bir süre belirt.`)] }).then(message.react(config.Others.Emojis.reject)).sil(3);

    const reason = args.slice(2).join(" ") || "Belirtilmedi.";
    if (message.member.roles.highest.position <= member.roles.highest.position) return message.reply({ embeds: [embed.setDescription(`${message.author}, Bu kullanıcıya herhangi bir işlem uygulayamam.`)] }).then(message.react(config.Others.Emojis.reject)).sil(3);

    let row = new MessageActionRow()
        .addComponents(new MessageButton()
        .setStyle("SUCCESS")
        .setLabel("Evet")
        .setCustomId("evet"))
        .addComponents(new MessageButton()
        .setStyle("DANGER")
        .setLabel("Hayır")
        .setCustomId("hayir"))

        let msg = await message.reply({ embeds: [ embed.setDescription(`${message.member}, ${member} üyesini gerçekten susturmak istiyor musunuz?`) ], components: [row] })
        var filter = (interaction) => interaction.member.id === message.member.user.id
        const collector = msg.createMessageComponentCollector({ filter, time: 15000 });

        collector.on("collect", async (interaction) => {

            if (interaction.member.id !== message.member.user.id) return interaction.reply({ content: `Başka bir kullanıcıya ait etkileşimi kullanamazsın.`, ephemeral: true });

            if (interaction.customId === "evet") {
     
              await penalSchema.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { penal: 1 } }, { upsert: true });
              await penalSchema.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
              await pointSchema.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { point: config.Others.Points.Mute } }, { upsert: true });
              await message.guild.members.cache.get(member.id).roles.add(config.Roles.Member.MutedRole);

              const time = ms(duration).replace("y", "yıl").replace("w", "ay").replace("d", "gün").replace("h", " saat").replace("m", " dakika").replace("s", " saniye");
              const penal = await client.penal(message.guild.id, member.user.id, "CHAT-MUTE", true, message.author.id, reason, true, Date.now() + duration);
              let data = await penals.find({ guildID: message.guild.id, userID: member.user.id, active: true }).sort({ date: -1 });
              data = data.map((x) => `${moment(x.finishDate).format("LLL")}`)
              
              message.reply({ embeds: [ embed.setDescription(`${member}, ${message.member} tarafından \`${reason}\` sebebiyle \`${time}\` süresince susturuldu.`) ] }).then(message.react(config.Others.Emojis.check)).sil(8)
          
              const log = new MessageEmbed()
              .setAuthor({ name: member.displayName, iconURL: member.displayAvatarURL({ dynamic: true }) })
              .setFooter("Khaos 💘").setTimestamp()
              .setThumbnail(message.guild.iconURL({ dynamic:true }))
              .setColor("#945f7f")
              .setDescription(`
            > ${member} kullanıcısı ${message.member} tarafından **${moment(Date.now()).format("LLL")}** tarihinde susturuldu. (\`#${penal.id}\`)
          
            • Kullanıcı: ${member} - (\`${member.id}\`)
            • Yetkili: ${message.author} - (\`${message.author.id}\`)
            • Sebep: \`${reason}\`
            • Süre: \`${time}\`
              
            → Cezalandırma **${data}** tarihinde sona erecektir.
              `)
          
          client.channels.cache.get(config.Channels.muteLogChannel).send({ embeds: [log] })
        
} else if (interaction.customId === "hayir") {

                if (interaction.member.id !== message.member.user.id) return interaction.reply({ content: `Başka bir kullanıcıya ait etkileşimi kullanamazsın.`, ephemeral: true })
                message.reply({ content:'İşlem iptal edildi.' }).sil(3)

              }
        })

  },
};
