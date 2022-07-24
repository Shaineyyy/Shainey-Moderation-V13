const { Discord, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js");
const config = require("../../Configurations/Server_Settings");
const Staff = require("../../Schemas/Register");
const Register = require("../../Schemas/Intakes");
const moment = require("moment");
const axios = require('axios');
require("moment-duration-format")
moment.locale("tr");

module.exports = {
    config: {
        aliases: ["profile", "user", "kullanıcı-bilgi","profil","me"],
        name: "Profile",
        help: "profil [@Shainey/ID]",
        enabled: true,
        staffLevel: 1
        },
    
        run: async ({ client, message, args, embed }) => {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const Total = await Staff.findOne({ guildID: message.guild.id, userID: member.id });

        if (message.guild.members.cache.has(member.id)) {
            let nickname = member.displayName == member.username ? "" + member.username + " [Görünen isim yok.] " : member.displayName
            const members = [...message.guild.members.cache.filter(x => !x.user.bot).values()].sort((a, b) => a.joinedTimestamp - b.joinedTimestamp);
            const joinPos = members.map((u) => u.id).indexOf(member.id);
            const roles = member.roles.cache.filter(role => role.id !== message.guild.id).sort((a, b) => b.position - a.position).map(role => `<@&${role.id}>`);
            const mr = []
            if (roles.length > 6) {
                const lent = roles.length - 6
                let itemler = roles.slice(0, 6)
                itemler.map(x => mr.push(x))
                mr.push(`Kalan **${lent}** rol listelenemiyor.`)
            } else {
                roles.map(x => mr.push(x))
            }

        Register.find({UserID: member.id}, async(err, data) => {
        const response = new MessageEmbed()
        .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .addFields(
        { 
        name: "❯ Yetkilinin Hesap Bilgileri;", 
        value: `\`•\` Hesap: ${member}\n\`•\` Kullanıcı ID: \`${member.id}\`\n\`•\` Oluşturma: __${moment(member.user.createdTimestamp).format("LLL")}__ (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)` },
        {
        
        name: "❯ Yetkilinin Sunucu Bilgileri;",
        value: `\`•\` Görünen İsim: \`${nickname}\`\n\`•\` Katılım Tarihi: <t:${parseInt(member.joinedAt / 1000)}:R>\n\`•\` Katılım Sırası: \`${joinPos}/${message.guild.members.cache.size}\`\n\`•\` Rolleri (\`${roles.length}\`):\n${mr.join(", ", " ")}` },
        
        { name: "❯ Yetkilinin kayıt Bilgileri;", 
        value: `\`•\` Erkek: \`${Total ? Total.Man : 0}\`\n\`•\` Kadın: \`${Total ? Total.Woman : 0}\`\n\`•\` Toplam: \`${Total ? Total.Total : 0}\`` }

        )

        const row = new MessageActionRow()
        .addComponents(new MessageSelectMenu()
        .setCustomId("banner")
        .setPlaceholder("Banner/Avatar için tıkla!")
        .addOptions([
            {
                label: "Banner",
                description: "Kullanıcı afişini döndürür.",
                value: "banner"
            },
            {
                label: "Avatar",
                description: "Kullanıcı avatarını döndürür.",
                value: "avatar"
            }
        ]), 
        );

        let msg = await message.reply({ embeds: [response], components: [row] })
        var filter = (menu) => menu.member.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, max: 2, time: 30000 })

        collector.on("collect", async menu => {
            const row = new MessageActionRow()
            .addComponents(new MessageButton()
            .setStyle("LINK")
            .setLabel("Tarayıcıda Görüntüle")
            .setURL(member.user.displayAvatarURL({ dynamic: true, size: 1024 }))      
            )

            if (menu.values[0] === "avatar") {
                menu.reply({ content: `${member.user.displayAvatarURL({ dynamic: true, size: 4096 })}`, components: [row], ephemeral: true }).then(+ setTimeout(() => msg.delete(), 2000), message.delete())
           
            } else if (menu.values[0] === "banner") {
                async function bannerURL(member, client) {
                    const response = await axios.get(`https://discord.com/api/v9/users/${member}`, { headers: { 'Authorization': `Bot ${client.token}` } });
                    if(!response.data.banner) return "Kullanıcıda özelleştirilmiş banner bulunmuyor."
                    if(response.data.banner.startsWith('a_')) return `https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.gif?size=512`
                    else return(`https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.png?size=512`)
                  }
                let bannerurl = await bannerURL(member.id, client)

                menu.reply({ content: `${bannerurl}`, ephemeral: true }), message.delete()
            }
        })
    })}
}};