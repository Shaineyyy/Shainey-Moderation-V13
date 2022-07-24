const config = require("../Configurations/Server_Settings");
const { MessageEmbed } = require("discord.js");
const snipe = require("../Schemas/Snipe");
const moment = require("moment");
moment.locale("tr");

module.exports = async message => {

    if(message.author.bot) return;
    await snipe.findOneAndUpdate({ guildID: message.guild.id, channelID: message.channel.id }, { $set: { messageContent: message.content, author: message.author.id, image: message.attachments.first() ? message.attachments.first().proxyURL : null, createdDate: message.createdTimestamp, deletedDate: Date.now() } }, { upsert: true });
  
 /*   const data = await snipe.findOne({ guildID: message.guild.id, channelID: message.channel.id });
    const channel = message.guild.channels.cache.get(config.Channels.messageDelete);
    if (!channel) return;

    const embed = new MessageEmbed()
    .setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
    .setDescription(`
    \`❯\` Kullanıcı: ${message.member} - (\`${message.member.id}\`)
    \`❯\` Mesaj Kanalı: ${message.channel} - (\`${message.channel.id}\`)
    \`❯\` Yazıldığı Tarih: <t:${parseInt(data.createdDate / 1000)}:R>
    \`❯\` Silindiği Tarih: <t:${parseInt(data.deletedDate / 1000)}:R>

    \`\`\`diff
- ${data.messageContent ? `${data.messageContent}` : "Mesaj içeriği bulunamadı."}\`\`\``)

if (message.attachments.first()) embed.setImage(message.attachments.first().proxyURL);
channel.send({ content: `**${message.author.tag}** tarafından **${message.channel.name}** kanalında **${moment(Date.now()).format("LLL")}** tarihinde bir mesaj silindi.`, embeds: [embed] });
*/

};

module.exports.config = {
    name: "messageDelete"
}