const { MessageEmbed } = require("discord.js");
const Register = require("../../Schemas/Register");

module.exports = {
	config: {
	aliases: ["top-stat", "top-teyit"],
	name: "topteyit",
	help: "top-stat [@Shainey/ID]",
	enabled: true,
        staffLevel:1
	},

	run: async ({ client, message, args, embed }) => { 
  
        let data = await Register.find({ guildID: message.guild.id })
        if(!data.length) return message.channel.send({embeds: [embed.setDescription(`${message.member} Sunucuya ait veri bulunamadı!`)]}).then(message.react(config.Others.Emojis.reject)).sil(3);

        let top = data
        .filter(s => message.guild.members.cache.has(s.userID) && s.Total > 0)
        .sort((a, b) => b.Total - a.Total)
        .map((value, index) => `\`${index +1}.\` ${message.guild.members.cache.get(value.userID)} toplam **${value.Total}** (Erkek **${value.Man}** - Kadın **${value.Woman}** )`).slice(0, 15).join('\n')
        message.channel.send({ 
            embeds: [
        embed
        .setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({dynamic: true})})
        .setThumbnail(message.guild.iconURL({ dynamic:true }))
        .setFooter("Khaos 💘")
        .setTimestamp()
        .setDescription(`Sunucuya ait ilk 15 kayıt verisi listeleniyor (**${data.length}**); \n\n${top}`)]})

}};