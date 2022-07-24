const config = require("../../Configurations/Server_Settings");
const { MessageEmbed } = require("discord.js");
const penals = require("../../Schemas/Penals");
const moment = require("moment");
moment.locale("tr");

module.exports = {
        config: {
    aliases: ["sicil"],
	name: "Sicil",
	help: "sicil [@Shainey/ID]",
	enabled: true,
    staffLevel: 1
	},

	run: async ({ client, message, args, embed }) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let data = await penals.find({ guildID: message.guild.id, userID: member.user.id, }).sort({ date: -1 });
        if (data.length === 0) return message.reply({ content: `Kullanıcıya ait sicil bilgisi bulunamadı.` }).then(message.react(config.Others.Emojis.reject)).sil(3)
        data = data.map((x) => `• \`#${x.id}\` - **[${x.type}]** __${moment(x.date).format("DD.MM.YYYY")}__ <@${x.staff}> (Durum: ${x.active ? "Devam Ediyor": "Bitti"})`).slice(0, 10).join("\n ")

        const res = new MessageEmbed()
        .setAuthor({ name: member.displayName, iconURL: member.displayAvatarURL({ dynamic: true }) })
        .setColor("#426375")
        .setDescription(data)

        if (data.length > 0) message.reply({ embeds: [res] }).then(message.react(config.Others.Emojis.check)).sil(10)

}};