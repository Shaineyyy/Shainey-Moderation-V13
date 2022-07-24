const inviteSchema = require('../../Schemas/Invite');

module.exports = {
    config: {
        name: "invite",
        help:"invite",
        aliases: ["invite"],
        enabled: true,
    },
    run: async ({ client, message, args, embed }) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let data = await inviteSchema.findOne({ guildID: message.guild.id, userID: member.id });
        if (!data) return message.channel.send({ embeds: [embed.setDescription(`Veri tabanında davet bilginiz bulunamadı!`)] }).sil(4);
        message.channel.send({ embeds: [embed.setDescription(`${message.member}, (Gerçek: **${data.Regular}** Sahte: **${data.Fake}** Ayrılan: **${data.Left}** Bonus: **${data.Bonus}**)!`)] }).sil(7);
    }
}