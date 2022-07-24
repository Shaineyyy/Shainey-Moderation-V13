const Penals = require("../../Schemas/Penals");
const config = require("../../Configurations/Server_Settings");

module.exports = {
	config: {
		aliases: ["reset-penal", "delete-penals","ceza-sıfırla"],
		name: "Ceza-sıfırla",
		help: "ceza-sıfırla [@Shainey/ID]",
		enabled: true,
        staffLevel:2
	},

	run: async ({ client, message, args, embed }) => {

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member) return message.channel.send({ content:`Lütfen kişi belirt.` }).then(message.react(config.Others.Emojis.reject)).sil(3)
        
        if(member) {
        let data = await Penals.find({ guildID: message.guild.id, userID: member.user.id, }).sort({ date: -1 });
        if (data.length === 0) return message.reply({ content: `Kullanıcıya ait sicil geçmişi bulunamadı.` }).then(message.react(config.Others.Emojis.reject)).sil(3)

        await Penals.deleteMany({ userID: member.user.id, guildID: message.guild.id })
        message.channel.send({ embeds: [embed.setDescription(`${member} üyesinin sicil geçmişi başarıyla temizlendi.`)]}).then(message.react(config.Others.Emojis.check)).sil(7)
        }

}};