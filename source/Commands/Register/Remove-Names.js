const { Discord, MessageEmbed } = require("discord.js");
const Names = require("../../Schemas/Intakes");
const config =  require("../../Configurations/Server_Settings");

module.exports = {
	config: {
		aliases: ["isimler-temizle", "geçmiş-temizle","reset-names"],
		name: "İsimler-temizle",
		help: "isimler-temizle [@Shainey/ID]",
		enabled: true,
        staffLevel:1
	},

	run: async ({ client, message, args, embed  }) => {

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member) return message.channel.send({ content:`Lütfen kişi belirt.` }).sil(3)
        if(member) {
        Names.find({ guildID: message.guild.id, userID: member.id }, async(err, data) => {
            if(err) console.log(err);
            if(data.length < 1) return message.reply({ content: `Kullanıcıya ait isim geçmişi bulunamadı.`}).sil(3)
            await Names.deleteMany({ userID: member.user.id, guildID: message.guild.id })
            message.channel.send({ embeds: [embed.setTimestamp().setDescription(`${member} kullanıcısına ait isim geçmişi başarıyla temizlendi.`)]}).sil(5)
        })
    }
}};