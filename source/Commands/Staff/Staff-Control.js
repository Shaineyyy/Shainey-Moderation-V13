const { MessageEmbed } = require("discord.js");
const config = require("../../Configurations/Server_Settings");

module.exports = {
    config: {
        aliases: ["ysay", "yetkili-say", "yetkilisay"],
        name: "Yetkili-Say",
        help: "ysay",
        enabled: true,
        staffLevel: 3
    },

    run: async ({ client, message, args }) => {

        let roles = message.guild.roles.cache.get(`${config.Roles.Staff.lowerStaff}`); 
        let üyeler = [...message.guild.members.cache.filter(uye => !uye.user.bot && uye.roles.highest.position >= roles.position && (uye.presence && uye.presence.status !== "offline") && !uye.voice.channel).values()]
        if(üyeler.length == 0) return message.reply({ content: `Bütün yetkililer sesli kanallarda.` }).then(message.react(config.Others.Emojis.check)).sil(3)
   
        message.reply(`Aktif olup sesli kanallarda olmayan **${üyeler.length ?? 0}** yetkili bulunmakta.\n\n ${üyeler.map(x => `<@${x.id}>`).join(",")}`)
    }
};