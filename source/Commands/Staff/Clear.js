const Config = require("../../Configurations/Server_Settings.js");

module.exports = {
    config: {
	aliases: ["sil", "temizle", "purge"],
	name: "Sil",
	help: "sil [1/100]",
	enabled: true
	},

	run: async ({ client, message, args, embed }) => {
       
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply({ content: `Gerekli olan yetkileri üzerinde taşımıyorsun.` }).then(message.react(config.Others.Emojis.reject)).sil(3);

        if (!args[0]) return message.reply({ content: `Mesaj miktarı belirt. (\`1/100\`)` }).then(message.react(config.Others.Emojis.reject)).sil(3);
        if(!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) return message.reply({ content: `\`1-100\` arasında bir sayı belirtmen gerekiyor.` }).then(message.react(config.Others.Emojis.reject)).sil(3);
        
        await message.channel.bulkDelete(Number(args[0])).then(msg => message.channel.send({ content: `Başarıyla **${msg.size}** adet mesaj temizlendi. ` })).sil(4)
    
}};