const { MessageEmbed, } = require("discord.js");
const Database = require('../../Schemas/Register');
const Schema = require('../../Schemas/Intakes');
const tagMode = require('../../Schemas/TagMode');
const config =  require("../../Configurations/Server_Settings");
const moment = require('moment');
require('moment-duration-format');
moment.locale("tr");

module.exports = {
	config: {
		name: "Erkek",
		aliases: ["e","erkek", "man"],
		help: "e [@Shainey/ID] Cengiz 17",
		enabled: true,
        staffLevel:1
	},

	run: async ({ client, message, args, embed }) => {
		
		if(message.channel.id !== config.Channels.registerChannel) return message.reply(`Bu komutu sadece <#${config.Channels.registerChannel}> kanalında kullanabilirsin.`).sil(3)

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		if (!member) return message.reply({ content: `Bir kullanıcı belirt. \`.e [@Shainey/ID] Cengiz 17\`` }).sil(3);

		const name = args.slice(1).filter(arg => isNaN(arg)).map(arg => arg[0].toUpperCase() + arg.slice(1).toLowerCase()).join(" ");
		if (!name) return message.reply({ content: `Bir isim belirt. \`.e [@Shainey/ID] Cengiz 17\`` }).sil(3);
		if (name.length > 20) return message.reply({ content: `İsim **20** sınırından uzun olduğundan dolayı işlem iptal edildi.` }).sil(3);

		let age = args[2]
		if (!age) return message.reply({ content: "Geçerli bir yaş belirtmelisin!" }).sil(3)
		if (isNaN(age)) return message.reply({ content: "Yaş geçerli rakamlardan oluşsun!" }).sil(3)
		if(age > 99) return message.reply({ content:"Yaş 99'dan büyük olamaz."}).sil(3)

		if (message.author.id === member.id) return message.reply({ content: `Kendi üzerinde bu işlemi uygulayamazsın.` }).then(message.react(config.Others.Emojis.reject)).sil(3)
		if (message.member.roles.highest.position <= member.roles.highest.position) return message.reply({ content: `Bu kullanıcıya herhangi bir işlem uygulayamam.` }).then(message.react(config.Others.Emojis.reject)).sil(3)
		if (!member.manageable) return message.reply({ content: `Bu kullanıcıya herhangi bir işlem uygulayamam` }).then(message.react(config.Others.Emojis.reject)).sil(3)
		
		let Nickname = `${config.Others.Tag.nameTag.some(tags => member.user.username.includes(tags)) ? config.Others.Tag.nameTag : config.Others.Tag.secondaryTag} ${name} | ${age}`

		let data = await tagMode.findOne({ guildID: message.guild.id });
		if(data.boolean == true) {
			if(config.Others.Tag.All.some(x => member.user.tag.includes(x) || member.roles.cache.has(config.Roles.Member.vipRole) || member.roles.cache.has(config.Roles.Member.boosterRole))) {

		Schema.findOne({ guildID: message.guild.id, userID: member.id }, async (err, shi) => {
			if (!shi) {
				let seul = [];
				seul.push({ Names: Nickname, Sex: `Erkek`, Staff: message.author.id, Date: Date.now() })
				new Schema({ guildID: message.guild.id, userID: member.id, Names: seul }).save().catch((err) => console.log(`${err}`))
			
				message.reply({ embeds: [new MessageEmbed().setFooter({ text: `Khaos 💘`, iconURL: message.guild.iconURL({ dynamic: true }) }).setTimestamp().setDescription(`Kullanıcı başarıyla kayıt edildi, \`${Nickname}\`.`)] })

			} else {

				shi.Names.push({ Names: Nickname, Sex: `Erkek`, Staff: message.author.id, Date: Date.now() })
				shi.save().catch((err) => console.log(`${err}`))

				let sayi = 1;
				let khaos = new MessageEmbed()
				.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
                .setFooter({ text: `.isimler Shainey/ID`, iconURL: message.guild.iconURL({ dynamic: true }) })
				.setThumbnail(message.guild.iconURL({ dynamic:true }))
				.setTimestamp()
				.setDescription(`
				${member} kullanıcısı başarıyla kayıt edildi, \`${Nickname}\`.
				Kullanıcının kayıt geçmişi; (\`${shi.Names.length}\`)
	
				${shi.Names.map(x => `\`${sayi++}.\` \`${x.Names}\` [ **${moment(x.Date).format("LLL")}** ] (<@${x.Staff}>)`).slice(0, 8).join("\n ")}
				`)
				message.reply({ embeds: [khaos] }), message.react(config.Others.Emojis.check);
			}
		})

		member.setNickname(`${Nickname}`);
		setTimeout(() => { member.roles.add(config.Roles.Member.manRoles).catch((err) => console.log(`${err}`)) }, 1000)
		member.roles.remove(config.Roles.Member.unregisteredRole).catch((err) => {{ }})
		if(config.Others.Tag.All.some(tagges => member.user.tag.includes(tagges))) { return member.roles.add(config.Roles.Member.tagRole)}
		
		Database.findOne({ userID: message.author.id }, async (err, ent) => {
			if (ent) {
				if (ent.Entries.includes(member.id)) {
					ent.Man = ent.Man
					ent.save().catch((err) => console.log(err))
				} else {
					ent.Entries.push(member.id)
					ent.Man = ent.Man + 1
					ent.Total = ent.Total + 1
					ent.save().catch((err) => console.log(err))
				}
			} else if (!ent) {
				let net = [];
				net.push(member.id)
				const data = new Database({
					guildID: message.guild.id,
					userID: message.author.id,
					Man: 1,
					Woman: 0,
					Total: 1,
					Entries: net
				})
				data.save().catch((err) => console.log(err))
			}
		}) 
	} else {
		return  message.channel.send({embeds: [embed.setDescription(`${message.member}, Taglı alım modu aktif, kullanıcıda tag bulunmadığı için kayıt işlemi gerçekleştirilemedi.`)]}).sil(7) }
  } else {
	Schema.findOne({ guildID: message.guild.id, userID: member.id }, async (err, shi) => {
		if (!shi) {
			let seul = [];
			seul.push({ Names: Nickname, Sex: `Erkek`, Staff: message.author.id, Date: Date.now() })
			new Schema({ guildID: message.guild.id, userID: member.id, Names: seul }).save().catch((err) => console.log(`${err}`))
		
			message.reply({ embeds: [new MessageEmbed().setFooter({ text: `Khaos 💘`, iconURL: message.guild.iconURL({ dynamic: true }) }).setTimestamp().setDescription(`Kullanıcı başarıyla kayıt edildi, \`${Nickname}\`.`)] })

		} else {

			shi.Names.push({ Names: Nickname, Sex: `Erkek`, Staff: message.author.id, Date: Date.now() })
			shi.save().catch((err) => console.log(`${err}`))

			let sayi = 1;
			let khaos = new MessageEmbed()
			.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
			.setFooter({ text: `.isimler Shainey/ID`, iconURL: message.guild.iconURL({ dynamic: true }) })
			.setThumbnail(message.guild.iconURL({ dynamic:true }))
			.setTimestamp()
			.setDescription(`
			${member} kullanıcısı başarıyla kayıt edildi, \`${Nickname}\`.
			Kullanıcının kayıt geçmişi; (\`${shi.Names.length}\`)

			${shi.Names.map(x => `\`${sayi++}.\` \`${x.Names}\` [ **${moment(x.Date).format("LLL")}** ] (<@${x.Staff}>)`).slice(0, 8).join("\n ")}
			`)
			message.reply({ embeds: [khaos] }), message.react(config.Others.Emojis.check);
		}
	})

	member.setNickname(`${Nickname}`);
	setTimeout(() => { member.roles.add(config.Roles.Member.manRoles).catch((err) => console.log(`${err}`)) }, 1000)
	member.roles.remove(config.Roles.Member.unregisteredRole).catch((err) => {{ }})
	if(config.Others.Tag.All.some(tagges => member.user.tag.includes(tagges))) { return member.roles.add(config.Roles.Member.tagRole)}
	
	Database.findOne({ userID: message.author.id }, async (err, ent) => {
		if (ent) {
			if (ent.Entries.includes(member.id)) {
				ent.Man = ent.Man
				ent.save().catch((err) => console.log(err))
			} else {
				ent.Entries.push(member.id)
				ent.Man = ent.Man + 1
				ent.Total = ent.Total + 1
				ent.save().catch((err) => console.log(err))
			}
		} else if (!ent) {
			let net = [];
			net.push(member.id)
			const data = new Database({
				guildID: message.guild.id,
				userID: message.author.id,
				Man: 1,
				Woman: 0,
				Total: 1,
				Entries: net
			})
			data.save().catch((err) => console.log(err))
		}
	}) 
  }
} 

};