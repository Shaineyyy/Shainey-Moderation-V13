const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");
const axios = require('axios');
const config = require("../../Configurations/Server_Settings");

module.exports = {
    config: {
		aliases: ["avatar", "av", "pp", "banner", "afiş"],
		name: "Avatar",
		help: "avatar [@Shainey/ID]",
		enabled: true
	},

	run: async ({ client, message, args }) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;

        let row = new MessageActionRow()
        .addComponents(new MessageSelectMenu()
        .setCustomId("profile")
        .setPlaceholder("Devam etmek için tıkla!")
        .addOptions([
            {
                label: "Avatar",
                description: "Kullanıcı avatarını görüntüle.",
                value: "avatar"
            },
            {
                label: "Banner",
                description: "Kullanıcı afişini görüntüle.",
                value: "banner"
            }
        ])
        
        );

        const avatar = `${member.displayAvatarURL({ dynamic: true, size: 4096 })}`

        const response = new MessageEmbed()
        .setAuthor({ name: message.guild.name, iconURL: member.displayAvatarURL({ dynamic: true }) })
        .setColor("RANDOM")
        .setDescription(`**❯** Aşağıda bulunan menü yardımıyla profil görüntüleme işlemine devam edebilirsin.`)

        let res = await message.reply({ embeds: [response], components: [row] })
        var filter = (menu) => menu.user.id === message.author.id;
        const collector = res.createMessageComponentCollector({ filter, max: 2, time: 30000 })

        collector.on("collect", async (menu) => {
            let row = new MessageActionRow()
            .addComponents(new MessageButton()
            .setStyle("LINK")
            .setLabel("Tarayıcıda Görüntüle")
            .setURL(avatar)
            )

            if (menu.values[0] === "avatar") {
                menu.reply({ content: avatar, components: [row], ephemeral: true }).then(+ setTimeout(() => res.delete(), 2000), message.delete())
           
            } else if (menu.values[0] === "banner") {
                async function bannerURL(member, client) {
                    const response = await axios.get(`https://discord.com/api/v9/users/${member}`, { headers: { 'Authorization': `Bot ${client.token}` } });
                    if(!response.data.banner) return "Kullanıcıda özelleştirilmiş banner bulunmuyor."
                    if(response.data.banner.startsWith('a_')) return `https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.gif?size=512`
                    else return(`https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.png?size=512`)
                  }
                let bannerurl = await bannerURL(member.id, client)

                menu.reply({ content: `${bannerurl}`, ephemeral: true }).then(+ setTimeout(() => res.delete(), 2000), message.delete())
            }
        });



}}
