const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../../Configurations/Server_Settings");

module.exports = {
    config: {
		aliases: ["üye-kontrol", "member-control"],
		name: "Üye-kontrol",
		help: "üye-kontrol",
		enabled: true,
        staffLevel: 1
	},

	run: async ({ client, message, args, embed }) => {

        const rolsuz = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0);
        const tagli = message.guild.members.cache.filter(s => !s.user.bot && config.Others.Tag.All.some(a => s.user.tag.toLowerCase().includes(a)));
        const tagsiz = message.guild.members.cache.filter(s => !s.user.bot && config.Others.Tag.All.some(a => !s.user.tag.toLowerCase().includes(a)));
        const reg = message.guild.members.cache.filter(b => !b.roles.cache.has(config.Roles.Member.unregisteredRole));

        const row = new MessageActionRow()
        .addComponents(new MessageButton()
        .setStyle("SECONDARY")
        .setLabel("Taglı Dağıt")
        .setEmoji("⚔️")
        .setCustomId("tagli")
        )
        .addComponents(new MessageButton()
        .setStyle("SECONDARY")
        .setLabel("Rolsüz Dağıt")
        .setEmoji("🧷")
        .setCustomId("rolsuz")
        )
        .addComponents(new MessageButton()
        .setStyle("PRIMARY")
        .setLabel("İptal Et")
        .setEmoji(config.Others.Emojis.reject)
        .setCustomId("iptal")
        )

        const fix = new MessageEmbed()
        .setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
        .setDescription(`
${message.author} kullanıcının kontrol paneli!

\`\`\`fix
- Sunucuda kayıtlı "${reg.size}" kullanıcı bulunuyor.
- Tagı olup taglı rolü bulunmayan "${tagli.size}" kullanıcı bulunuyor.
- Tagı bulunmayan "${tagsiz.size}" kullanıcı bulunuyor.
- Rolsüz "${rolsuz.size}" kullanıcı bulunuyor.
\`\`\`
Aşağıda bulunana butonlar yardımıyla işleme devam edebilirsin.
`)
     
    let rep = await message.reply({ embeds: [fix], components: [row] })
    var filter = (interaction) => interaction.member.id === message.author.id;
    const collector = rep.createMessageComponentCollector({ filter, time: 30000 })

    collector.on("collect", async interaction => {
        if (interaction.customId === "tagli") {
            if (interaction.member.id !== message.author.id) return interaction.reply({ content: `Başka bir kullanıcıya ait etkileşimi kullanamazsın.`, ephemeral: true })

            message.guild.members.cache.filter(s => !s.user.bot && config.Others.Tag.All.some(a => s.user.tag.toLowerCase().includes(a))).map(b => b.roles.add(config.Roles.Member.tagRole))

            interaction.reply({ content: `Taglı rolü bulunmayan **${tagli.size}** kullanıcıya __taglı__ rolü dağıtıldı.`, ephemeral: true }).then(+ setTimeout(() => rep.delete(), 5000))

        } else if (interaction.customId === "rolsuz") {
            if (interaction.member.id !== message.author.id) return interaction.reply({ content: `Başka bir kullanıcıya ait etkileşimi kullanamazsın.`, ephemeral: true })
            rolsuz.forEach(async r => {
                await r.roles.add(config.Roles.Member.unregisteredRole)
            })

            interaction.reply({ content: `Rolsüz **${rolsuz.size}** kullanıcıya __kayıtsız__ rolü dağıtıldı.`, ephemeral: true }).then(+ setTimeout(() => rep.delete(), 5000))

        } else if (interaction.customId === "iptal") {
            if (interaction.member.id !== message.author.id) return interaction.reply({ content: `Başka bir kullanıcıya ait etkileşimi kullanamazsın.`, ephemeral: true })

            interaction.reply({ content: `Kontrol işlemi başarıyla iptal edildi.`, ephemeral: true }).then(+ setTimeout(() => rep.delete(), 2000))
        }
    })

}};