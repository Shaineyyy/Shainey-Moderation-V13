const settings = require('../../Configurations/Client_Settings');
const inviteSchema = require('../../Schemas/Invite');

module.exports = {
    config: {
        aliases: ["reset-invites"],
        name: "davet-sıfırla",
        enabled: true,
        help: "davet-sıfırla",
        staffLevel: 4
    },
    run: async ({ client, message, args, embed }) => {

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
        if (args[0] == 'top') {
            await inviteSchema.deleteMany({ guildID: message.guild.id }).then(a => {
                return message.channel.send({ embeds: [embed.setDescription(`Sunucuya ait tüm davet verileri silindi!`)] }).sil(7);
            }).catch(e => {
                return message.channel.send({ embeds: [embed.setDescription(`Veriler silinirken bir hata oluştu lütfen bot sahibine ulaşınız!`)] }).sil(4);
            })
        }
        if (!member) return message.channel.send({ embeds: [embed.setDescription(`Bir kullanıcı etiketleyerek kullanıcının verisini sil veya \`.top\` yazarak tüm sunucunun verisini silebilirsin!`)] }).sil(5);
        if (member) {
            let data = await inviteSchema.findOne({ guildID: message.guild.id, userID: member.id });
            if (!data) return message.channel.send({ embeds: [embed.setDescription(`Veri tabanında davet bilgisi bulunamadı!`)] }).sil(3);
            await inviteSchema.deleteOne({ guildID: message.guild.id, userID: member.id }).then(a => {
                return message.channel.send({ embeds: [embed.setDescription(`Kullanıcıya ait tüm davet verileri silindi!`)] }).sil(7);
            }).catch(e => {
                return message.channel.send({ embeds: [embed.setDescription(`Veriler silinirken bir hata oluştu lütfen bot sahibine ulaşınız!`)] }).sil(4);
            })
        } else {
            return message.channel.send({ embeds: [embed.setDescription(`Silinecek veriyi belirtin. \`${settings.prefix}sıfırla [@Shainey/ID/top]\``)] }).sil(4)
        }
    }
}