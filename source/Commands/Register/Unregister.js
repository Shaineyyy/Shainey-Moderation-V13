const config =  require("../../Configurations/Server_Settings");

module.exports = {
	config: {
	aliases: ["unreg", "unregister","kayıtsız"],
	name: "Kayıtsız",
	help: "kayıtsız [@Shainey/ID]",
	enabled: true,
    staffLevel:1
	},
        
        run: async ({ client, message, args }) => {
        
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!member) return message.reply({ content: `Bir kullanıcı belirt.` }).then(message.react(config.Others.Emojis.reject)).sil(3);

        if (message.author.id === member.id) return message.reply({ content: `Kendi üzerinde bu komutu kullanamazsın.` }).then(message.react(config.Others.Emojis.reject)).sil(3);
        if (message.member.roles.highest.position <= member.roles.highest.position) return message.reply({ content: `Bu kullanıcıya herhangi bir işlem uygulayamam.` }).then(message.react(config.Others.Emojis.reject)).sil(3);
        if (!member.manageable) return message.reply({ content: `Bu kullanıcıya herhangi bir işlem uygulayamam.` }).then(message.react(config.Others.Emojis.reject)).sil(3);

        await member.setNickname(config.Others.unregisteredName);
        await member.roles.set(member.roles.cache.has(config.Roles.Member.boosterRole) ? [config.Roles.Member.boosterRole, config.Roles.Member.unregisteredRole] : [config.Roles.Member.unregisteredRole]).catch();
        message.reply({ content: `${member} kullanıcısı başarıyla kayıtsıza gönderildi.` }).then(message.react(config.Others.Emojis.check)).sil(5);
    
}};