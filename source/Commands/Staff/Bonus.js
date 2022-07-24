const settings = require('../../Configurations/Client_Settings');
const config = require('../../Configurations/Server_Settings');
const inviteSchema = require('../../Schemas/Invite');

module.exports = {
    config: {
        name: "bonus",
        aliases: ["bonus"],
        help:"bonus",
        enabled: true,
        staffLevel: 4

    },
    run: async ({ client, message, args, embed }) => {
        let cmd = args[0];
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
        let value = Number(args[2]);
        if (cmd == 'ekle') {
            if (!member) return message.channel.send({ embeds: [embed.setDescription(`Bir kullanıcı belirtmelisin.`)] }).sil(7);
            if (!value) return message.channel.send({ embeds: [embed.setDescription(`Bir değer belirtmelisin.`)] }).sil(7);

            let data = await inviteSchema.findOne({ guildID: message.guild.id, userID: member.id })
            if (!data) {
                await new inviteSchema({ guildID: message.guild.id, userID: member.id, Regular: 0, Fake: 0, Left: 0, leftedMembers: [], Bonus: value }).save();
                await message.channel.send({ embeds: [embed.setDescription(`${member} Adlı kullanıcıya **${value}** adet bonus davet eklendi!`)] }).sil(8);
            } else {
                data.Bonus += value
                await data.save();
                await message.channel.send({ embeds: [embed.setDescription(`${member} Adlı kullanıcıya **${value}** adet bonus davet eklendi!`)] }).sil(8);

            }
        } else if (cmd == 'sil') {
            if (!member) return message.channel.send({ embeds: [embed.setDescription(`Bir kullanıcı girmelisin.`)] }).sil(3);
            if (!value) return message.channel.send({ embeds: [embed.setDescription(`Bir değer girmelisin.`)] }).sil(3);
            let data = await inviteSchema.findOne({ guildID: message.guild.id, userID: member.id });
            if (!data) return message.channel.send({ embeds: [embed.setDescription(`Bu kullanıcının davet verisi bulunamadı`)] }).sil(3);
            data.Bonus -= value;
            await data.save();
            await message.channel.send({ embeds: [embed.setDescription(`${member} Adlı kullanıcıdan **${value}** adet bonus davet silindi!`)] }).sil(8);
        } else {
            message.channel.send({ embeds: [embed.setDescription(`Lütfen argümanları doğru giriniz. \`${settings.prefix}bonus [ekle/sil] [@Shainey/ID] [sayı]\``)] }).sil(4)
        }
    }
}