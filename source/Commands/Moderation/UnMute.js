const config = require("../../Configurations/Server_Settings");
const { Discord, MessageEmbed } = require("discord.js");
const penals = require("../../Schemas/Penals");
const moment = require("moment");
moment.locale("tr");

module.exports = {
	config: {
		aliases: ["unmute", "mutekaldır", "mute-kaldır"],
		name: "Unmute",
		help: "unmute [@Shainey/ID]",
		enabled: true,
        staffLevel: 2
	},

	run: async ({ client, message, args, embed }) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.reply({ content: `Bir kullanıcı belirt.` }).then(message.react(config.Others.Emojis.reject)).sil(3)
        if (!member.roles.cache.has(config.Roles.Muted)) return message.reply({ embeds: [embed.setDescription(`${message.author}, Belirtilen kullanıcı Mute cezası almamış.`)] }).then(message.react(config.Others.Emojis.reject)).sil(3)
        if (message.member.roles.highest.position <= member.roles.highest.position) return message.reply({ embeds: [embed.setDescription(`${message.author}, Bu kullanıcıya herhangi bir işlem uygulayamam.`)] }).then(message.react(config.Others.Emojis.reject)).sil(3)
        if (!member.manageable) return message.reply({ embeds: [embed.setDescription(`${message.author}, Kullanıcıya Unmute işlemi uygulayamıyorum.`)] }).then(message.react(config.Others.Emojis.reject)).sil(3)

        await message.guild.members.cache.get(member.id).roles.remove(config.Roles.Member.MutedRole);
        const data = await penals.findOne({ userID: member.user.id, guildID: message.guild.id, type: "CHAT-MUTE", active: true });
        if (data) {
        data.active = false;
        await data.save();
        }

        message.reply({ embeds: [embed.setDescription(`${member}, Kullanıcının Mute cezası kaldırıldı.`)] }).then(message.react(config.Others.Emojis.check)).sil(8)

        const res = new MessageEmbed()
        .setAuthor({ name: member.displayName, iconURL: member.displayAvatarURL({ dynamic: true }) })
        .setColor("#8f5fb6")
        .setDescription(`
        > **${member.user.tag}** kullanıcısının susturulması **${message.author.tag}** tarafından  **${moment(Date.now()).format("LLL")}** tarihinde kaldırıldı.

        • Kullanıcı: ${member} - (\`${member.id}\`)
        • Yetkili: ${message.author} - (\`${message.author.id}\`)
        `)
        
        client.channels.cache.get(conf.Channels.MuteLogChannel).send({ embeds: [res] })

}}