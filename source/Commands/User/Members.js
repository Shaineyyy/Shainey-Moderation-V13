const { MessageEmbed } = require("discord.js");
const config = require("../../Configurations/Server_Settings");

module.exports = {
    config: {
		aliases: ["say"],
		name: "Say",
		help: "say",
		enabled: true
	},

	run: async ({ client, message, args }) => {
        
    let Total = message.guild.memberCount;
    let Online = message.guild.members.cache.filter(member => member.presence && (member.presence.status !== "offline")).size;
    let Voice = message.guild.members.cache.filter(x => x.voice.channel).size;
    let Afks = message.guild.members.cache.filter(a => a.voice.channel == config.Channels.afkVoice).size;
    let Boost = message.guild.premiumSubscriptionCount;
    let Level = message.guild.premiumTier;
    let NameTag = message.guild.members.cache.filter(w => config.Others.Tag.nameTag.some(tags => w.user.username.toLowerCase().includes(tags.toLowerCase()))).size;
    let DiscTag = message.guild.members.cache.filter(s => s.user.discriminator == config.Others.Tag.discTag).size;

        const response = new MessageEmbed()
        .setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
        .setFooter("Khaos 💘")
        .setTimestamp()
        .setThumbnail(message.guild.iconURL({ dynamic:true }))
        .setDescription(`
        \`❯\` Sunucuda **${Total}** kullanıcı bulunuyor. (\`+${Online}\` Aktif.)
        \`❯\` Ses kanallarında **${Voice}** kullanıcı bulunuyor. (\`${Afks}\` Afk.)
        \`❯\` Sunucuda **${Boost}** takviye bulunuyor. (\`${Level}\`. Seviye!)
        \`❯\` Tagımızda **${NameTag+DiscTag}** kullanıcı bulunuyor. (\`${NameTag}\` Tag, \`${DiscTag}\` Etiket.)`)

        message.reply({ embeds: [response] }).catch((err) => console.log(err), message.react(config.Others.Emojis.check));

}};