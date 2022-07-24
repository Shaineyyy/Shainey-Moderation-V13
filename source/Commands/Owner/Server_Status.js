const { MessageEmbed } = require('discord.js');
const Config = require("../../Configurations/Server_Settings");
const Settings = require('../../Configurations/Client_Settings');

module.exports = {
	config: {
		aliases: ["server-status", "sunucu-durum"],
		name: "sunucu-ayar",
        help:"sunucu-ayar",
		enabled: true,
        owner:true
	},

	run: async ({ client, message, args, embed }) => {

let manroles = Config.Roles.Member.manRoles
let woman = Config.Roles.Member.womanRoles

        message.reply({ embeds: [

new MessageEmbed()
.setTimestamp()
.setThumbnail(message.guild.iconURL({ dynamic:true, size: 1024 }))
.setFooter("Khaos 💘")
.setTitle(`${message.guild.name} sunucusu için ayar durumları;`)
.setDescription(`
__**Roller;**__
> Yetkili Rolleri;

• Ban yetkisi: ${Config.Roles.Staff.banHammer ? message.guild.roles.cache.get(Config.Roles.Staff.banHammer) : "__\`❌ Ayarlanmamış\`__"}
• Mute yetkisi: ${Config.Roles.Staff.muteHammer ? message.guild.roles.cache.get(Config.Roles.Staff.muteHammer) :  "__\`❌ Ayarlanmamış\`__"}
• Jail yetkisi: ${Config.Roles.Staff.jailHammer ? message.guild.roles.cache.get(Config.Roles.Staff.jailHammer) :  "__\`❌ Ayarlanmamış\`__"}
• Uyarı yetkisi: ${Config.Roles.Staff.warnHammer ? message.guild.roles.cache.get(Config.Roles.Staff.warnHammer) :  "__\`❌ Ayarlanmamış\`__"}
• Kayıt yetkisi: ${Config.Roles.Staff.registerHammer ? message.guild.roles.cache.get(Config.Roles.Staff.registerHammer) :  "__\`❌ Ayarlanmamış\`__"}

> Kullanıcı rolleri;

• Şüpheli rol(ler)ü: ${Config.Roles.Member.suspectRole ? message.guild.roles.cache.get(Config.Roles.Member.suspectRole) :  "__\`❌ Ayarlanmamış\`__"}
• Kayıtsız rol(ler)ü: ${Config.Roles.Member.unregisteredRole ? message.guild.roles.cache.get(Config.Roles.Member.unregisteredRole) :  "__\`❌ Ayarlanmamış\`__"}
• Erkek rol(ler)ü: ${manroles.map(roller => "<@&" + roller + ">").join(", ") || "__\`❌ Ayarlanmamış\`__"}
• Kadın rol(ler)ü: ${woman.map(roller => "<@&" + roller + ">").join(", ") || "__\`❌ Ayarlanmamış\`__"}
• Booster rolü: ${Config.Roles.Member.boosterRole ? message.guild.roles.cache.get(Config.Roles.Member.boosterRole) :  "__\`❌ Ayarlanmamış\`__"}
• Vip rolü: ${Config.Roles.Member.vipRole ? message.guild.roles.cache.get(Config.Roles.Member.vipRole) : "__\`❌ Ayarlanmamış\`__"}
• Taglı rolü: ${Config.Roles.Member.tagRole ? message.guild.roles.cache.get(Config.Roles.Member.tagRole) :  "__\`❌ Ayarlanmamış\`__"}
• Tasarımcı rolü: ${Config.Roles.Member.Designer ? message.guild.roles.cache.get(Config.Roles.Member.Designer) :  "__\`❌ Ayarlanmamış\`__"}
• Yayıncı rolü: ${Config.Roles.Member.Streamer ? message.guild.roles.cache.get(Config.Roles.Member.Streamer) :  "__\`❌ Ayarlanmamış\`__"}
• Müzisyen rolü: ${Config.Roles.Member.Musician ? message.guild.roles.cache.get(Config.Roles.Member.Musician) :  "__\`❌ Ayarlanmamış\`__"}

• Karantina rolü: ${Config.Roles.Member.jailRole ? message.guild.roles.cache.get(Config.Roles.Member.jailRole) :  "__\`❌ Ayarlanmamış\`__"}
• Mute rolü: ${Config.Roles.Member.MutedRole ? message.guild.roles.cache.get(Config.Roles.Member.MutedRole) :  "__\`❌ Ayarlanmamış\`__"}
• V.Mute rolü: ${Config.Roles.Member.VoiceMuted ? message.guild.roles.cache.get(Config.Roles.Member.VoiceMuted) :  "__\`❌ Ayarlanmamış\`__"}

__**Kanallar;**__
> Ana kanallar; 

• Kural kanalı: ${Config.Channels.rulesChannel ? message.guild.channels.cache.get(Config.Channels.rulesChannel) :  "__\`❌ Ayarlanmamış\`__"}
• Kayıt kanalı: ${Config.Channels.registerChannel ? message.guild.channels.cache.get(Config.Channels.registerChannel) :  "__\`❌ Ayarlanmamış\`__"}
• Mesaj kanalı: ${Config.Channels.chatChannel ? message.guild.channels.cache.get(Config.Channels.chatChannel) :  "__\`❌ Ayarlanmamış\`__"}

> Loglar;

• Ban log: ${Config.Channels.banLogChannel ? message.guild.channels.cache.get(Config.Channels.banLogChannel) :  "__\`❌ Ayarlanmamış\`__"}
• Mute log: ${Config.Channels.muteLogChannel ? message.guild.channels.cache.get(Config.Channels.muteLogChannel) :  "__\`❌ Ayarlanmamış\`__"}
• Uyarı log: ${Config.Channels.warnLogChannel ? message.guild.channels.cache.get(Config.Channels.warnLogChannel) :  "__\`❌ Ayarlanmamış\`__"}
• Karantina log: ${Config.Channels.jailLogChannel ? message.guild.channels.cache.get(Config.Channels.jailLogChannel) :  "__\`❌ Ayarlanmamış\`__"}
• Mesaj log: ${Config.Channels.messageLogChannel ? message.guild.channels.cache.get(Config.Channels.messageLogChannel) :  "__\`❌ Ayarlanmamış\`__"}
• Davet log: ${Config.Channels.inviteChannel ? message.guild.channels.cache.get(Config.Channels.inviteChannel) :  "__\`❌ Ayarlanmamış\`__"}
• Şüpheli log: ${Config.Channels.suspectChannel ? message.guild.channels.cache.get(Config.Channels.suspectChannel) :  "__\`❌ Ayarlanmamış\`__"}
• Tag log: ${Config.Channels.tagLogChannel ? message.guild.channels.cache.get(Config.Channels.tagLogChannel) :  "__\`❌ Ayarlanmamış\`__"}
`)
]})

}};