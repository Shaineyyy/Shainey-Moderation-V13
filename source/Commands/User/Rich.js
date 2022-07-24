const moment = require("moment");
moment.locale("tr");
const config = require("../../Configurations/Server_Settings");

module.exports = {
    config: {
        aliases: ["booster", "zengin", "b"],
        name: "Booster",
        help: "booster [İsim]",
        enabled: true
    },

    run: async ({ client, message, args, embed }) => {

        const role = config.Roles.Member.boosterRole || undefined;
        if (!role) return message.reply({ content: `Komutu çalıştırmak için veritabanında booster rolünü bulamadım.` }).then(message.react(config.Others.Emojis.reject)).sil(3)
        if (!message.member.roles.cache.has(role)) return message.reply({ content: `Bu komutu kullanmak için sunucumuza boost basman gerekiyor.` }).then(message.react(config.Others.Emojis.reject)).sil(3)
        const member = message.guild.members.cache.get(message.author.id);
        const Name = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace("i", "İ").toUpperCase()+arg.slice(1)).join(" ");
       
 if (!Name) return message.reply({ content: `Bir isim belirt. \`.nick [İsim]\`` }).then(message.react(config.Others.Emojis.check)).sil(3)

        let boosterName = `${config.Others.Tag.nameTag.some(tags => member.user.username.includes(tags)) ? config.Others.Tag.nameTag : config.Others.Tag.secondaryTag} ${Name}`
        member.setNickname(boosterName).catch();
        message.reply({ content: `İsmin **${boosterName}** olarak güncellendi.` }).then(message.react(config.Others.Emojis.check)).sil(3)

}};