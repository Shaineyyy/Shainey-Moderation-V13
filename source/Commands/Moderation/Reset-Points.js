const Penals = require("../../Schemas/Penals");
const Points = require("../../Schemas/PenalPoint");
const Penal = require("../../Schemas/Penal");

module.exports = {
	config: {
		aliases: ["reset-penalpoints", "delete-penalpoints","cezapuan-sıfırla"],
		name: "Cezapuan-sıfırla",
		help: "cezapuan-sıfırla [@Shainey/ID]",
		enabled: true,
        staffLevel:2
	},

	run: async ({ client, message, args, embed, reply, interaction }) => {

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member) return message.channel.send({ content:`Lütfen kişi belirt.` }).sil(3)
        if(member) {
        let data = await Penals.find({ guildID: message.guild.id, userID: member.user.id, }).sort({ date: -1 });
        if (data.length === 0) return message.reply({ content: `Kullanıcıya ait ceza geçmişi bulunamadı.` }).sil(3)

        await Points.deleteMany({ userID: member.user.id, guildID: message.guild.id })
        await Penal.deleteMany({ userID: member.user.id, guildID: message.guild.id })

        message.channel.send({ embeds: [embed.setDescription(`${member} üyesinin ceza puan geçmişi başarıyla temizlendi.`)]}).sil(4)
        }

}};