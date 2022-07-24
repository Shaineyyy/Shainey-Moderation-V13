const { Discord, MessageEmbed, Message } = require("discord.js");
const moment = require("moment");
moment.locale("tr")
const Schema = require("../Schemas/Afk");

module.exports = async message => {

    if(message.author.bot || !message.guild) return;
    let data = await Schema.findOne({ guildID: message.guild.id, userID: message.author.id });
    let embed = new MessageEmbed().setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) });

    if (data) {
        let afkData = await Schema.findOne({ guildID: message.guild.id, userID: message.author.id });
        await Schema.deleteOne({ guildID: message.guild.id, userID: message.author.id });
        if(message.member.displayName.includes("[AFK]") && message.member.manageable) await message.member.setNickname(message.member.displayName.replace("[AFK]", ""));
        message.reply({ embeds: [embed.setDescription(`Afk modundan çıkış yaptın, <t:${parseInt(afkData.date / 1000)}:R> afk moduna girmişsin!`)] }).sil(5)
     }
     const member = message.mentions.members.first();
     if (!member) return;

     const afkData = await Schema.findOne({ guildID: message.guild.id, userID: member.user.id });
     if (!afkData) return;
    message.channel.send({ embeds: [embed.setDescription(`${member.toString()} kullanıcısı <t:${parseInt(afkData.date / 1000)}:R> __${afkData.reason}__ sebebiyle AFK moduna girmiş!`)] }).sil(8)

};

module.exports.config = {
    name: "messageCreate"
}