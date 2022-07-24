const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../../Configurations/Server_Settings");

module.exports = {
    config: {
        aliases: ["git", "go"],
        name: "Git",
        help: "git [@Shainey/ID]",
        enabled: true
    },

    run: async ({ client, message, args, embed }) => {         

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!message.member.voice.channel) return message.reply({ content: `Bir sesli kanala bağlı değilsin.` }).then(message.react(config.Others.Emojis.reject)).sil(3)
        if (!member) return message.reply({ content: `Bir kullanıcı belirt. \`.git [@Shainey/ID]\`` }).then(message.react(config.Others.Emojis.reject)).sil(3)
        if (member.id === client.user.id) return message.reply({ content: `Bu kullanıcıya kanala katılma isteği gönderemezsin.` }).then(message.react(config.Others.Emojis.reject)).sil(3)
        if (member.id === message.author.id)return message.reply({ content: `Kendi üzerinde bu işlemi uygulayamazsın.` }).then(message.react(config.Others.Emojis.reject)).sil(3)
        if (!member.voice.channel) return message.reply({ content: `Belirtilen **${member.user.tag}** kullanıcısı bir sesli kanala bağlı değil.` }).then(message.react(config.Others.Emojis.reject)).sil(3)
        if (message.member.voice.channel.id === member.voice.channel.id) return message.reply({ content: `Belirtilen **${member.user.tag}** kullanıcısıyla aynı ses kanalındasınız.` }).then(message.react(config.Others.Emojis.reject)).sil(3)

        let row = new MessageActionRow()
        .addComponents(new MessageButton()
        .setStyle("SECONDARY")
        .setLabel("Kabul Et")
        .setEmoji(config.Others.Emojis.check)
        .setCustomId("kabul")
        )
        .addComponents(new MessageButton()
        .setStyle("SECONDARY")
        .setLabel("Reddet")
        .setEmoji(config.Others.Emojis.reject)
        .setCustomId("red")
        )

        const request = new MessageEmbed()
        .setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
        .setDescription(`${message.author} kullanıcısı bulunduğun kanala (<#${member.voice.channel.id}>) gelmek istiyor.`)

        let msg = await message.reply({ content: `${member}`, embeds: [request], components: [row] })
        var filter = (interaction) => interaction.member.id === member.user.id
        const collector = msg.createMessageComponentCollector({ filter, time: 30000 });

        collector.on("collect", async (interaction) => {
            if (interaction.member.id !== member.user.id) return interaction.reply({ content: `Başka bir kullanıcıya ait etkileşimi kullanamazsın.`, ephemeral: true })
            if (interaction.customId === "kabul") {
                message.member.voice.setChannel(member.voice.channel);
                interaction.reply({ content: `${message.member} kullanıcısı bulunduğun <#${member.voice.channel.id}> kanalına taşındı.`, ephemeral: true })
          
            } else if (interaction.customId === "red") {
                if (interaction.member.id !== member.user.id) return interaction.reply({ content: `Başka bir kullanıcıya ait etkileşimi kullanamazsın.`, ephemeral: true })
                interaction.reply({ content: `${message.member} kullanıcısının <#${member.voice.channel.id}> kanalına gelme isteği reddedildi.`, ephemeral: true })
            
            }
        })
}};