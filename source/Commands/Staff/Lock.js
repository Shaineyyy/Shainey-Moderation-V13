const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config =  require("../../Configurations/Server_Settings");

module.exports = {
    config: {
		aliases: ["kilit", "lock"],
		name: "Kilit",
		help: "lock",
		enabled: true,
        staffLevel:2
	},

	run: async ({ client, message, args, embed }) => {

        const row = new MessageActionRow()
        .addComponents(new MessageButton()
        .setStyle("SUCCESS")
        .setLabel("Kanal Kilit")
        .setEmoji(config.Others.Emojis.check)
        .setCustomId("channel_lock")
        )
        .addComponents(new MessageButton()
        .setStyle("DANGER")
        .setLabel("İptal Et")
        .setEmoji(config.Others.Emojis.reject)
        .setCustomId("iptal")
        )

        const response = new MessageEmbed()
        .setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
        .setDescription(`
\`\`\`fix
- Bulunduğun kanalın kilit durumu: ${message.channel.permissionsFor(message.guild.id).has("SEND_MESSAGES") ? "Açık" : "Kapalı"}
\`\`\`
`)

    let res = await message.reply({ embeds: [response], components: [row] })
    var filter = (interaction) => interaction.member.id === message.author.id;
    const collector = res.createMessageComponentCollector({ filter, time: 15000 })

    collector.on("collect", async (interaction) => {
        if (interaction.customId === "channel_lock") {
            if (interaction.member.id !== message.author.id) return interaction.reply({ content: `Başka bir kullanıcıya ait etkileşimi kullanamazsın.`, ephemeral: true })
            if (message.channel.permissionsFor(message.guild.id).has("SEND_MESSAGES")) {
                message.channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: false })
                .then(async () => { await interaction.reply({ content: "Kanal kilitlendi.", ephemeral: true }) }).then(+ setTimeout(() => res.delete(), 5000))
            } else {
                message.channel.permissionOverwrites.edit(message.guild.id, { SEND_MESSAGES: true })
                .then(async () => { await interaction.reply({ content: "Kanal kilidi açıldı.", ephemeral: true }) }).then(+ setTimeout(() => res.delete(), 5000))
            }
        } else if (interaction.customId === "iptal") {
            if (interaction.member.id !== message.author.id) return interaction.reply({ content: `Başka bir kullanıcıya ait etkileşimi kullanamazsın.`, ephemeral: true })

            interaction.reply({ content: "İşlem iptal edildi.", ephemeral: true }).then(+ setTimeout(() => res.delete(), 2000))

        }
    })
}};