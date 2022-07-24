const config = require("../../Configurations/Server_Settings");
const Point = require("../../Schemas/PenalPoint");
const Roles = require("../../Schemas/JailRoles");
const Penals = require("../../Schemas/Penals");
const moment = require("moment");
moment.locale("tr");

module.exports = {
	config: {
		aliases: ["unjail", "jailkaldır", "jail-kaldır"],
		name: "Unjail",
		help: "unjail [@Shainey/ID]",
		enabled: true,
        staffLevel: 4
	},

	run: async ({ client, message, args, embed }) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.reply({ embeds: [embed.setDescription(`${message.author}, Bir kullanıcı belirt.`)] }).then(message.react(config.Others.Emojis.reject)).sil(3);
        if (!member.roles.cache.has(config.Roles.Member.jailRole)) return message.reply({ embeds: [embed.setDescription(`${message.author}, Belirtilen kullanıcı Jail cezası almamış.`)] }).then(message.react(config.Others.Emojis.reject)).sil(3);
        if (message.member.roles.highest.position <= member.roles.highest.position) return message.reply({ embeds: [embed.setDescription(`${message.author}, Bu kullanıcıya herhangi bir işlem uygulayamam.`)] }).then(message.react(config.Others.Emojis.reject)).sil(3);
        if (!member.manageable) return message.reply({ embeds: [embed.setDescription(`${message.author}, Kullanıcıya Unjail işlemi uygulayamıyorum.`)] }).then(message.react(config.Others.Emojis.reject)).sil(3);

        const roles = await Roles.findOne({ guildID: message.guild.id, userID: member.user.id })

        await message.guild.members.cache.get(member.id).setRoles(roles.Roles);
        await Roles.deleteMany({ guildID: message.guild.id, userID: member.user.id })
        const data = await Penals.findOne({ userID: member.user.id, guildID: message.guild.id, $or: [{ type: "JAIL" }, { type: "TEMP-JAIL" }], active: true })
        if (data) {
        data.active = false;
        await data.save();
        }

        message.reply({ embeds: [embed.setDescription(`${member}, Kullanıcının Jail cezası kaldırıldı.`)] }).then(message.react(config.Others.Emojis.check)).sil(8);

        const log = embed.setThumbnail(member.user.avatarURL({ dynamic: true })).setDescription(`
        > ${member.toString()} - \`${member.id}\` Kullanıcının Jail cezası kaldırıldı.
        
        • Kullanıcı: ${member ? member.toString() : "undefined"} - (\`${member.id}\`)
        • Yetkili: ${message.author} - (\`${message.author.id}\`)
        
        → Jail Kaldırılma Tarihi: \`${moment(Date.now()).format("LLL")}\`
        `)
        
        client.channels.cache.get(config.Channels.jailLogChannel).send({ embeds: [log] })

}};