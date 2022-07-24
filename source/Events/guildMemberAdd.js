const { Client, GuildMember, Invite } = require("discord.js");
const config = require('../Configurations/Server_Settings');
const inviteSchema = require('../Schemas/Invite');
const moment = require('moment');
require('moment-duration-format');
moment.locale("tr");

/**
 * 
 * @param {Client} client 
 */

module.exports = async (member, inviter, invite) => {
    let isMemberFake = (Date.now() - member.user.createdTimestamp) < 7 * 24 * 60 * 60 * 1000;
    let inviteChannel = client.channels.cache.get(config.Channels.inviteChannel);
    let inviterData = await inviteSchema.findOne({ guildID: member.guild.id, userID: inviter.user.id });
    if (inviterData) {
        if (isMemberFake) {
                if (inviterData.leftedMembers.includes(member.id)) { await inviterData.leftedMembers.pull(member.id); inviterData.Left-- }
                await inviterData.Fake++;
                await inviterData.save();
                setTimeout(async() => {     
                  member.setNickname("• Şüpheli");
                  member.roles.set([config.Roles.Member.suspectRole]) 
                  }, 1000)
                  await member.roles.set(member.roles.cache.has(config.Roles.Member.boosterRole) ? [config.Roles.Member.boosterRole, config.Roles.Member.suspectRole] : [config.Roles.Member.suspectRole]).catch();
                  member.guild.channels.cache.get(config.Channels.suspectChannel)
                  .send({ embeds: [ new MessageEmbed()
                  .setDescription(`${member} - (\`${member.id}\`) kullanıcının hesabı (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>) oluşturulmuş. Şüpheli olarak işaretlendi. \`.suspect [@Shainey/ID]\``)] })
                  if (inviteChannel) inviteChannel.send({ content: `:inbox_tray: \`${member.user.tag.toString()}\` Adlı kullanıcı sunucuya katıldı. Davet eden: **${inviter.user.tag == member.guild.name ? "Özel URL" : inviter.user.tag}** (**${inviter.user.tag == member.guild.name ? await member.guild.fetchVanityData().then(a => a.uses) : inviterData ? inviterData.Regular : '0'} Davet - Sahte**)` })
        
        } else {
            if (invite.code !== member.guild.vanityURLCode) {
                if (inviterData.leftedMembers.includes(member.id)) { await inviterData.leftedMembers.pull(member.id); await inviterData.Left--; }
                await inviterData.Regular++;
                await inviterData.save().then(async a => { });
                member.guild.channels.cache.get(config.Channels.registerChannel).send(`
:tada: Sunucumuz'a hoş geldin ${member}!
        
Hesabın __**${moment(member.user.createdTimestamp).format("LLL")}**__ tarihinde (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>) oluşturulmuş. Güvenilir gözüküyor.
        
Sunucu kurallarımız <#${config.Channels.rulesChannel}> kanalında belirtilmiştir. Alacağın \`ceza-i işlemler\` kuralları okuduğunu varsayarak işlenir.

${inviter} tarafından davet edilerek sunucumuzun **${member.guild.memberCount}.** kişisi oldun. İyi eğlenceler :tada::tada::tada:
        `)
            }
            if (inviteChannel) inviteChannel.send({ content: `:inbox_tray: \`${member.user.tag.toString()}\` Adlı kullanıcı sunucuya katıldı. Davet eden: **${inviter.user.tag == member.guild.name ? "Özel URL" : inviter.user.tag}** (**${inviter.user.tag == member.guild.name ? await member.guild.fetchVanityData().then(a => a.uses) : inviterData ? inviterData.Regular : '0'} Davet - Gerçek**)` })
        }
    } else {
        if (isMemberFake) {
            if (invite.code !== member.guild.vanityURLCode) await new inviteSchema({ guildID: member.guild.id, userID: inviter.user.id, Regular: 0, Fake: 1, Left: 0, Bonus: 0 }).save();
            if (inviteChannel) inviteChannel.send({ content: `:inbox_tray: \`${member.user.tag.toString()}\` Adlı kullanıcı sunucuya katıldı. Davet eden: **${inviter.user.tag == member.guild.name ? "Özel URL" : inviter.user.tag}** (**${inviter.user.tag == member.guild.name ? await member.guild.fetchVanityData().then(a => a.uses) : inviterData ? inviterData.Regular : '0'} Davet - Sahte**)` })
        } else {
            if (invite.code !== member.guild.vanityURLCode) await new inviteSchema({ guildID: member.guild.id, userID: inviter.user.id, Regular: 1, Fake: 0, Left: 0, Bonus: 0 }).save();
            if (inviteChannel) inviteChannel.send({ content: `:inbox_tray: \`${member.user.tag.toString()}\` Adlı kullanıcı sunucuya katıldı. Davet eden: **${inviter.user.tag == member.guild.name ? "Özel URL" : inviter.user.tag}** (**${inviter.user.tag == member.guild.name ? await member.guild.fetchVanityData().then(a => a.uses) : inviterData ? inviterData.Regular : '0'} Davet - Gerçek**)` })
        }
    }
};

module.exports.config = {
    name: 'memberJoin'
}