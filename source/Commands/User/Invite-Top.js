const inviteSchema = require('../../Schemas/Invite');

module.exports = {
    config: {
        name: "top",
        help:"top",
        aliases: ["top"],
        enabled: true,
    },
    run: async ({ client, message, args, embed }) => {
        let data = await inviteSchema.find({ guildID: message.guild.id });
        if (data.length < 1) return message.channel.send({ embeds: [embed.setDescription(`Sunucuya ait davet verisi bulunamadı!`)] }).sil(7);
        let listed = data.filter(s => s.Regular > 0 && message.guild.members.cache.has(s.userID)).sort((a, b) => b.Regular - a.Regular).map((value, index) => `\`${index + 1}.\` <@!${value.userID}>, (Gerçek: **${value.Regular}** Sahte: **${value.Fake}** Ayrılan: **${value.Left}** Bonus: **${value.Bonus}**)`).slice(0, 10).join('\n');
        message.channel.send({ embeds: [embed.setDescription(`**${message.guild.name}** Sunucusunun top 10 davet verileri; \n\n ${listed}`)] }).sil(20)
    }
}