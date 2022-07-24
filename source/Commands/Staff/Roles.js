const config = require("../../Configurations/Server_Settings");
const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
		aliases: ["role", "rol"],
		name: "Rol",
		help: "role [@Shainey/ID]",
		enabled: true,
        staffLevel:4
	},

	run: async ({ client, message, args, embed }) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!member) return message.reply({ content: `Bir kullanıcı belirt. \`.role [@Shainey/ID] [Rol]\`` }).then(message.react(config.Others.Emojis.reject)).sil(3);
        if(member.roles.highest.position >= message.member.roles.highest.position) return message.reply({ content: `Bu kullanıcıya herhangi bir işlem uygulayamazsın.` }).then(message.react(config.Others.Emojis.reject)).sil(3);
        if(!member.manageable) return message.reply({ content: `Bu kullanıcıya herhangi bir işlem uygulayamıyorum.` }).then(message.react(config.Others.Emojis.reject)).sil(3);
        
        if (!args[1]) return message.reply({ content: `Bir argüman belirt. \`.role [@Shainey/ID] [Rol] - (vip, yayıncı, yazılımcı, tasarımcı)\`\`` }).then(message.react(config.Others.Emojis.reject)).sil(3);
        
        if(args[1] === "vip") {
            if (member.roles.cache.has(config.Roles.Member.vipRole)) {
                await message.guild.members.cache.get(member.id).roles.remove(config.Roles.Vip)
                message.reply({ embeds: [embed.setDescription(`${member.toString()} kullanıcısından <@&${config.Roles.Vip}> rolü alındı.`)] }).then(message.react(config.Others.Emojis.check)).sil(6);
            } else {
                await message.guild.members.cache.get(member.id).roles.add(config.Roles.Vip)
                message.reply({ embeds: [embed.setDescription(`${member.toString()} kullanıcısına <@&${config.Roles.Vip}> rolü verildi.`)] }).then(message.react(config.Others.Emojis.check)).sil(6);
            }

        }
        if(args[1] === "streamer" || args[1] === "yayıncı") {
            if (member.roles.cache.has(config.Roles.Member.Streamer)) {
                await message.guild.members.cache.get(member.id).roles.remove(config.Roles.Streamer)
                message.reply({ embeds: [embed.setDescription(`${member.toString()} kullanıcısından <@&${config.Roles.Streamer}> rolü alındı.`)] }).then(message.react(config.Others.Emojis.check)).sil(6);
            } else {
                await message.guild.members.cache.get(member.id).roles.add(config.Roles.Streamer)
                message.reply({ embeds: [embed.setDescription(`${member.toString()} kullanıcısına <@&${config.Roles.Streamer}> rolü verildi.`)] }).then(message.react(config.Others.Emojis.check)).sil(6);
            }

        }
        if(args[1] === "tasarımcı") {
            if (member.roles.cache.has(config.Roles.Member.Designer)) {
                await message.guild.members.cache.get(member.id).roles.remove(config.Roles.Member.Designer)
                message.reply({ embeds: [embed.setDescription(`${member.toString()} kullanıcısından <@&${config.Roles.Member.Designer}> rolü alındı.`)] }).then(message.react(config.Others.Emojis.check)).sil(6);
            } else {
                await message.guild.members.cache.get(member.id).roles.add(config.Roles.Member.Designer)
                message.reply({ embeds: [embed.setDescription(`${member.toString()} kullanıcısına <@&${config.Roles.Member.Designer}> rolü verildi.`)] }).then(message.react(config.Others.Emojis.check)).sil(6);
            }

        }
}};