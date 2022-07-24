const { Discord, MessageEmbed } = require("discord.js");
const config =  require("../../Configurations/Server_Settings");

module.exports = {
    config: {
	aliases: ["suspect", "şüpheli"],
	name: "Suspect",
	help: "suspect [@Shainey/ID]",
	enabled: true,
    staffLevel:1
	},

	run: async ({ client, message, args, embed }) => {
         
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.reply({ content: `Bir kullanıcı belirt.` }).then(message.react(config.Others.Emojis.reject)).sil(3);
        if (!member.roles.cache.get(config.Roles.Member.suspectRole)) return message.reply({ content: `Bu kullanıcı şüpheli değil.` }).sil(3), message.react(config.Others.Emojis.reject);

        await member.setNickname(config.Others.unregisteredName);
        await member.roles.set(member.roles.cache.has(config.Roles.Member.boosterRole) ? [config.Roles.Member.boosterRole, config.Roles.Member.unregisteredRole] : [config.Roles.Member.unregisteredRole]).catch();
        message.reply({ embeds: [embed.setDescription(`${member.toString()} kullanıcısı başarıyla kayıtsıza gönderildi.`)] }).then(message.react(config.Others.Emojis.reject)).sil(3);
    
}};