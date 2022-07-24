const config = require("../../Configurations/Server_Settings");
const { MessageEmbed } = require("discord.js");
const penals = require("../../Schemas/Penals");

module.exports = {
    config: {
		aliases: ["unban", "bankaldır", "ban-kaldır"],
		name: "Unban",
		help: "unban [@Shainey/ID]",
		enabled: true,
        staffLevel: 3
	},

	run: async ({ client, message, args, embed }) => {

        if (!args[0]) return message.reply({ content: `Bir kullanıcı belirt. \`.unban [@Shainey/ID]\`` }).then(message.react(config.Others.Emojis.reject)).sil(3);
        const control = await message.guild.bans.fetch(message.guild.id, args[0]);
        if (!control) return message.reply({ content: `Belirtilen kullanıcı yasaklı değil.` }).then(message.react(config.Others.Emojis.reject)).sil(3);

      try { 
        message.guild.members.unban(args[0], { reason: `Kaldıran: ${message.author.tag} | ${message.author.id}` })

        const data = await penals.findOne({ userID: control.id, guildID: message.guild.id, type: "BAN", active: true });
        if (data) {
            data.active = false;
            await data.save();
        }

        message.reply({ content: `**${control.user.username.replace(/\`/g, "")}** kullanıcının yasaklanması başarıyla kaldırıldı.` }).then(message.react(config.Others.Emojis.check)).sil(7);
    } catch(err) {
        message.reply({ content:`Bir sorun oluştu! ${err}` }).sil(3)
    }
}};