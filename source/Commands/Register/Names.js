const { Discord, MessageEmbed } = require("discord.js");
const Register = require("../../Schemas/Intakes");
const config =  require("../../Configurations/Server_Settings");
const moment = require('moment');
require('moment-duration-format');
moment.locale("tr");

module.exports = {
	config: {
		aliases: ["isimler", "names"],
		name: "İsimler",
		help: "names [@Shainey/ID]",
		enabled: true,
        staffLevel:1
	},

	run: async ({ client, message, args, embed }) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member) return message.reply({ content: `Bir kullanıcı belirt. \`.isimler [@Shainey/ID]\`` }).then(message.react(config.Others.Emojis.reject)).sil(3);

        Register.findOne({ guildID: message.guild.id, userID: member.id }, async(err, res) => {
		if(!res) {
        message.reply({ content: `Kullanıcıya ait geçmiş isim bilgisi bulunamadı.` }).then(message.react(config.Others.Emojis.reject)).sil(3);
		} else {    
        let num = 1;
		let emb = new MessageEmbed()
		.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
        .setThumbnail(message.guild.iconURL({ dynamic:true }))
        .setTimestamp()
        .setFooter("Khaos 💘")
		.setDescription(`
        ${member} kullanıcısına ait **${res.Names.length}** isim kaydı bulunmakta.

		${res.Names.map(x => `\`${num++}.\` \`${x.Names}\` [ **${moment(x.Date).format("LLL")}** ] (<@${x.Staff}>)`).join("\n ")}
		`)
		message.reply({ embeds: [emb] }).then(message.react(config.Others.Emojis.reject)).sil(15);
        }
	})


}};