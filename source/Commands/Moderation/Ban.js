const config = require("../../Configurations/Server_Settings");
const { Discord, MessageEmbed } = require("discord.js");
const Points = require("../../Schemas/PenalPoint");
const Penal = require("../../Schemas/Penal");
const moment = require("moment");
moment.locale("tr");

module.exports = {
	config: {
		aliases: ["ban", "yasakla","infaz"],
		name: "Ban",
		help: "ban [@Shainey/ID] [Sebep]",
		enabled: true,
                staffLevel:3
	},

	run: async ({ client, message, args, embed }) => {

        if (!args[0]) return message.reply({ embeds: [embed.setDescription(`${message.author}, Bir kullanıcı belirt.`)] }).then(message.react(config.Others.Emojis.reject)).sil(3);

        const user = message.mentions.members.first() || await message.guild.members.cache.get(args[0])
        if (!user) return message.reply({ embeds: [embed.setDescription(`${message.author}, Geçerli bir kullanıcı belirt.`)] }).then(message.react(config.Others.Emojis.reject)).sil(3);

        const ban = await client.fetchBan(message.guild, args[0]);
        if (ban) return message.reply({ embeds: [embed.setDescription(`${message.author}, Belirtilen kullanıcı zaten yasaklı kişiler arasında bulunuyor.`)] }).then(message.react(config.Others.Emojis.reject)).sil(3);

        const reason = args.slice(1).join(" ") || "Belirtilmedi.";
        const member = message.guild.members.cache.get(user.id);

        if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send({ embeds: [embed.setDescription(`${message.author}, Bu kullanıcıya herhangi bir işlem uygulayamam.`)] }).then(message.react(config.Others.Emojis.reject)).sil(3);
        if (member && !member.bannable) return message.reply({ embeds: [embed.setDescription(`${message.author}, Kullanıcıyı yasaklayamıyorum.`)] }).then(message.react(config.Others.Emojis.reject)).sil(3);

        message.guild.members.ban(user.id, { reason: `${reason}`}).catch(() => {});
        const penal = await client.penal(message.guild.id, user.id, "BAN", true, message.author.id, reason);

        message.reply({ content: `Kullanıcı **"${reason}"** sebebiyle sunucudan yasaklanmıştır. (\`Ceza ID: ${penal.id}\`)` }).then(message.react(config.Others.Emojis.check)).sil(8);

        const log = embed.setThumbnail(member.user.avatarURL({ dynamic: true })).setDescription(`
        > ${member.toString()} - \`${user.id}\` Kullanıcı sunucudan yasaklandı.
        
        • Kullanıcı: ${member} - (\`${user.id}\`)
        • Yetkili: ${message.author} - (\`${message.author.id}\`)
        • Sebep: \`${reason}\`
        
        → Yasaklanma Tarihi: \`${moment(Date.now()).format("LLL")}\`
        `)
        
        client.channels.cache.get(config.Channels.banLogChannel).send({ embeds: [log] })


        await Penal.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id}, { $push: { penal: 1 } }, { upsert: true });
        await Penal.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { top: 1 } }, { upsert: true });
        await Points.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $inc: { cezapuan: config.Others.Points.Ban } }, { upsert: true })

}}