const { MessageEmbed } = require("discord.js");
const Register = require("../../Schemas/Register");
const config = require("../../Configurations/Server_Settings");
const settings = require('../../Configurations/Client_Settings');

module.exports = {
	config: {
	aliases: ["kayıt-stat", "stat", "stats"],
	name: "Stat",
	help: "stat [@Shainey/ID]",
	enabled: true,
        staffLevel:1
	},

	run: async ({ client, message, args }) => { 
  
        const member = message.author;
        const data = await Register.findOne({ guildID: message.guild.id, userID: member.id });

        let emb = new MessageEmbed()
        .setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
        .setTimestamp()
        .setFooter("Khaos 💘")
        .setDescription(`
        > ${member} üyesinin sunucu için kayıt bilgileri;
        
        :white_small_square: Toplam Kayıt: \`${data ? data.Total : 0}\`
        :white_small_square: Erkek Kayıt: \`${data ? data.Man : 0}\`
        :white_small_square: Kadın Kayıt: \`${data ? data.Woman : 0}\`
        `)

        message.reply({ embeds: [emb] }).sil(10)
        message.react(config.Others.Emojis.check)
    
}};