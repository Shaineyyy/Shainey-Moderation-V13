const { Client, GuildMember, Invite } = require("discord.js");
const config = require('../Configurations/Server_Settings');
const inviteSchema = require('../Schemas/Invite');

/**
 * 
 * @param {Client} client 
 */

module.exports = async (member, inviter, invite) => {
    let isMemberFake = (Date.now() - member.user.createdTimestamp) < 7 * 24 * 60 * 60 * 1000;
    let inviteChannel = client.channels.cache.get(config.Channels.inviteChannel);
    let inviterData = await inviteSchema.findOne({ guildID: member.guild.id, userID: inviter.user.id })
    if (inviterData) {
        if (isMemberFake) {
            await inviterData.Fake--;
            await inviterData.Left++
            await inviterData.leftedMembers.push(member.id)
            await inviterData.save().then(async (a) => {
                if (inviteChannel) inviteChannel.send({ content: `:outbox_tray: \`${member.user.tag.toString()}\` Adlı kullanıcı sunucudan ayrıldı. Davet eden: **${inviter.user.tag == member.guild.name ? "Özel URL" : inviter.user.tag}** (**${inviter.user.tag == member.guild.name ? await member.guild.fetchVanityData().then(a => a.uses) : inviterData ? inviterData.Regular : '0'} Davet**)` })
            });
        } else {
            await inviterData.Regular--;
            await inviterData.Left++
            await inviterData.leftedMembers.push(member.id);
            await inviterData.save().then(async (a) => {
                if (inviteChannel) inviteChannel.send({ content: `:outbox_tray: \`${member.user.tag.toString()}\` Adlı kullanıcı sunucudan ayrıldı. Davet eden: **${inviter.user.tag == member.guild.name ? "Özel URL" : inviter.user.tag}** (**${inviter.user.tag == member.guild.name ? await member.guild.fetchVanityData().then(a => a.uses) : inviterData ? inviterData.Regular : '0'} Davet**)` })
            });
        }
    } else {
        if (isMemberFake) {
            await new inviteSchema({ guildID: member.guild.id, userID: inviter.user.id, Regular: 0, Fake: 0, Left: 1, Bonus: 0, leftedMembers: member.id }).save().then(async (e) => {
                if (inviteChannel) inviteChannel.send({ content: `:outbox_tray: \`${member.user.tag.toString()}\` Adlı kullanıcı sunucudan ayrıldı. Davet eden: **${inviter.user.tag == member.guild.name ? "Özel URL" : inviter.user.tag}** (**${inviter.user.tag == member.guild.name ? await member.guild.fetchVanityData().then(a => a.uses) : inviterData ? inviterData.Regular : '0'} Davet**)` })
            });
        } else {
            await new inviteSchema({ guildID: member.guild.id, userID: inviter.user.id, Regular: 0, Fake: 0, Left: 1, Bonus: 0, leftedMembers: member.id }).save().then(async (e) => {
                if (inviteChannel) inviteChannel.send({ content: `:outbox_tray: \`${member.user.tag.toString()}\` Adlı kullanıcı sunucudan ayrıldı. Davet eden: **${inviter.user.tag == member.guild.name ? "Özel URL" : inviter.user.tag}** (**${inviter.user.tag == member.guild.name ? await member.guild.fetchVanityData().then(a => a.uses) : inviterData ? inviterData.Regular : '0'} Davet**)` })
            });
        }
    }
};

module.exports.config = {
    name: 'memberLeave'
}