const config = require("../../Configurations/Server_Settings");
const Point = require("../../Schemas/PenalPoint");
const moment = require("moment");
moment.locale("tr");

module.exports = {
	config: {
		aliases: ["cezapuan", "ceza-puan", "cp"],
		name: "Cezapuan",
		help: "cezapuan [@Shainey/ID]",
		enabled: true,
        staffLevel: 2
	},

	run: async ({ client, message, args, embed }) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if (!member) return message.reply({ embeds: [embed.setDescription(`${message.author}, Bir kullanıcı belirt.`)] }).then(message.react(config.Others.Emojis.reject)).sil(3)

        const pointData = await Point.findOne({ guildID: config.guildID, userID: member.user.id });

        message.reply({ embeds: [embed.setDescription(`${member.toString()}, Kullanıcının Ceza Puanı: \`${pointData ? pointData.point : 0}\``)] }).then(message.react(config.Others.Emojis.reject)).sil(6)
		
}};