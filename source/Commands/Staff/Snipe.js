const config =  require("../../Configurations/Server_Settings");
const { Discord, MessageEmbed } = require("discord.js");
const Schema = require("../../Schemas/Snipe");
const moment = require("moment");
moment.locale("tr");

module.exports = {
    config: {
	  aliases: ["snipe"],
	  name: "Snipe",
	  help: "snipe [@Shainey/ID]",
	  enabled: true,
      staffLevel:1
	},

	run: async ({ client, message, args, embed }) => {

        const data = await Schema.findOne({ guildID: message.guild.id, channelID: message.channel.id });
        if (!data) return message.reply({ embeds: [embed.setDescription(`${message.author}, Bu kanalda silinmiş herhangi bir mesaj bulunmuyor.`)] }).sil(3)
        const aut = await client.fetchUser(data.author);

        const response = new MessageEmbed()
        if (aut) response.setAuthor({ name: aut.username, iconURL: aut.displayAvatarURL({ dynamic: true }) })
        if (aut) response.setThumbnail(aut.displayAvatarURL({ dynamic: true }))
        .setDescription(`

Mesaj Sahibi: ${data.author ? `<@${data.author}> - (\`${data.author})\`` : "**Bulunamadı.**"}
Mesaj İçeriği: ${data.messageContent ? `**${data.messageContent}**` : "**Bulunamadı.**"}
Yazılma Tarihi: <t:${parseInt(data.createdDate / 1000)}:R>
Silinme Tarihi: <t:${parseInt(data.deletedDate / 1000)}:R>

> Dosya mı?: ${data.image ? `Evet, <#${config.Channels.messageLogChannel}> kanalına gönderildi.` : "Hayır"}

`)

message.reply({ embeds: [response] }).then(message.react(config.Others.Emojis.check)).sil(10)
    
}};