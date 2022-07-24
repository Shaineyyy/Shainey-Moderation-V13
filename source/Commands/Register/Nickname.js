const { MessageEmbed } = require("discord.js");
const Schema = require('../../Schemas/Intakes')
const config =  require("../../Configurations/Server_Settings");

module.exports = {
	config: {
		aliases: ["i", "isim", "nick"],
		name: "İsim",
		help: "nick [@Shainey/ID] Cengiz 17",
		enabled: true,
        staffLevel:1
	},

	run: async ({ client, message, args }) => {   

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if (!member) return message.reply({ content: `Bir kullanıcı belirt. \`.isim [@Shainey/ID] Cengiz 17\`` }).then(message.react(config.Others.Emojis.reject)).sil(3);
		
		const name = args.slice(1).filter(arg => isNaN(arg)).map(arg => arg[0].toUpperCase() + arg.slice(1).toLowerCase()).join(" ");
		const age =  args.slice(1).filter(arg => !isNaN(arg))[0] ?? undefined;

        if (!name) return message.reply({ content: `Bir isim belirt. \`.isim [@Shainey/ID] Cengiz 17\`` }).then(message.react(config.Others.Emojis.reject)).sil(3);
		if (!age) return message.reply({ content: `Bir yaş belirt. \`.isim [@Shainey/ID] Cengiz 17\`` }).then(message.react(config.Others.Emojis.reject)).sil(3);

		if (name.length > 20) return message.reply({ content: `İsim **20** sınırından uzun olduğundan dolayı işlem iptal edildi.` }).then(message.react(config.Others.Emojis.reject)).sil(3);
		if (age > 99) return message.reply({ content: `Yaş 99'dan büyük olamaz.` }).then(message.react(config.Others.Emojis.reject)).sil(3);

		if (message.author.id === member.id) return message.reply({ content: `Kendi üzerinde bu işlemi uygulayamazsın.` })
		if (message.member.roles.highest.position <= member.roles.highest.position) return message.reply({ content: `Bu kullanıcıya herhangi bir işlem uygulayamam.` }).then(message.react(config.Others.Emojis.reject)).sil(3);
		if (!member.manageable) return message.reply({ content: `Bu kullanıcıya herhangi bir işlem uygulayamam` }).then(message.react(config.Others.Emojis.reject)).sil(3);

		let Nickname = `${config.Others.Tag.nameTag.some(tags => member.user.username.includes(tags)) ? config.Others.Tag.nameTag : config.Others.Tag.secondaryTag} ${name} | ${age}`

		member.setNickname(`${Nickname}`)

		let model = await Schema.findOne({
			guildID: message.guild.id,
			userID: member.id
		})

		if (!model) model = await Schema.create({
			guildID: message.guild.id,
			userID: member.id,
			Entries: []
		})

		Schema.findOne({ guildID: message.guild.id, userID: member.id }, async (err, res) => {
			if (!res) {
				let arr = [];
				arr.push({ Names: Nickname, Sex: `İsim Değiştirme`, Staff: message.author.id, Date: Date.now() })
				new Schema({ guildID: message.guild.id, userID: member.id, Names: arr }).save().catch((err) => console.log(`${err}`))

				let embed = new MessageEmbed()
				.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
				.setDescription(`${member} kullanıcının ismi \`${Nickname}\` olarak güncellendi.`)
				.setFooter({ text: `Khaos 💘`, iconURL: message.guild.iconURL({ dynamic: true }) })

				message.reply({ embeds: [embed] }).sil(10)
                message.react(config.Others.Emojis.check);
			} else {
				res.Names.push({ Names: Nickname, Sex: `İsim Değiştirme`, Staff: message.author.id, Date: Date.now() })
				res.save().catch((err) => console.log(`${err}`))

				let embed = new MessageEmbed()
				.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
				.setDescription(`${member} kullanıcının ismi \`${Nickname}\` olarak güncellendi.`)
				.setFooter({ text: `Khaos 💘`, iconURL: message.guild.iconURL({ dynamic: true }) })

				message.reply({ embeds: [embed] }).sil(10)
                message.react(config.Others.Emojis.check);
			}
		})

}};