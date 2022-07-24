const { MessageEmbed } = require("discord.js");
const config = require("../../Configurations/Server_Settings");

module.exports = {
    config: {
	aliases: ["tagtara", "tt"],
	name: "Tag-tara",
	help: "tag-tara",
	enabled: true
    },
    run: async ({ client, message, args, embed }) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin.`)] }).sil(3)

    config.Others.Tag.All.some(teg => message.guild.members.cache.filter(s => s.tag.toLowerCase().includes(teg) && !s.roles.cache.has(config.Roles.Member.tagRole)).forEach(m => m.roles.add(config.Roles.Member.tagRole)))
    message.reply({ embeds: [embed.setDescription(`
\`-\` Kullanıcı adında \`${config.Others.Tag.All}\` taglarını bulunduran kullanıcılara taglı rolü verildi.
`)] }).catch((err) => console.log(err))

    }
}