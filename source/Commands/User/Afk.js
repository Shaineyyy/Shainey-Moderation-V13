const { MessageEmbed } = require("discord.js");
const Schema = require("../../Schemas/Afk");
const config = require("../../Configurations/Server_Settings");

module.exports = {
    config: {
	aliases: ["afk"],
	name: "Afk",
	help: "afk [Sebep]",
	enabled: true
	},

	run: async ({ client, message, args, embed }) => {

        if(message.member.displayName.includes("[AFK]")) return;

        let reason = args.join(" ") || "En kısa zamanda geri döneceğim.";
        await Schema.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $set: { reason, date: Date.now() } }, { upsert: true })
        if(message.member.manageable) message.member.setNickname(`[AFK] ${message.member.displayName}`); 
      
        message.reply({ content: `AFK moduna giriş yaptın, sebebini __${reason}__ olarak ayarladım.` }).sil(5)
        message.react(config.Others.Emojis.check);
    
}};