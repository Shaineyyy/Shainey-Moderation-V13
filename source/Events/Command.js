const settings = require("../Configurations/Client_Settings");
const config = require("../Configurations/Server_Settings");
const { MessageEmbed } = require("discord.js");
const client = global.client;
let sent = false;

setInterval(() => {
	client.cooldown.forEach((x, index) => {
		if (Date.now() - x.lastUsage > x.cooldown) client.cooldown.delete(index);
	});
}, 5000);

/**
 * @param {Message} message
 * @returns {Promise<void>}
 */

module.exports = async (message) => {
	const prefix = settings.prefix.find((x) => message.content.toLowerCase().startsWith(x));
	if (message.author.bot || !message.guild || !prefix) return;
	let args = message.content.substring(prefix.length).trim().split(" ");
	let commandName = args[0].toLowerCase();

	const embed = new MessageEmbed()
	.setAuthor({ name: message.member.displayName, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
	.setColor("9B59B6")


	args = args.splice(1);
	let cmd = client.commands.has(commandName) ? client.commands.get(commandName) : client.commands.get(client.aliases.get(commandName));
	if (!cmd || (cmd.config.owner && !settings.clientOwner.includes(message.author.id)) || !cmd.config.enabled) return;

if(cmd.staffLevel == 1) { 
	if(!message.member.roles.cache.has(config.Roles.Staff.registerHammer) && !message.member.hasPermission("MANAGE_SERVER")) return message.reply(`Bu komutu kullanmak için gerekli izinlere sahip değilsin.`).sil(5)
}

if(cmd.staffLevel == 2) { 
	if(!message.member.roles.cache.has(config.Roles.Staff.muteHammer) && !message.member.hasPermission("MANAGE_SERVER")) return message.reply(`Bu komutu kullanmak için gerekli izinlere sahip değilsin.`).sil(5)
}

if(cmd.staffLevel == 3) { 
	if(!message.member.roles.cache.has(config.Roles.Staff.banHammer) && !message.member.hasPermission("MANAGE_SERVER")) return message.reply(`Bu komutu kullanmak için gerekli izinlere sahip değilsin.`).sil(5)
}

if(cmd.staffLevel == 4) { 
	if(!message.member.roles.cache.has(config.Roles.Staff.jailHammer) && !message.member.hasPermission("MANAGE_SERVER")) return message.reply(`Bu komutu kullanmak için gerekli izinlere sahip değilsin.`).sil(5)
}

	if (!settings.clientOwner.includes(message.author.id)) {
		const cooldown = cmd.config.cooldown || 4000;
		if (client.cooldown.has(message.author.id)) {
			const cd = client.cooldown.get(message.author.id);
			const diff = Date.now() - cd.lastUsage;
			if (diff < cooldown) {
				if (!sent) {
					sent = true;
					return;
				}
			}
		} else
			client.cooldown.set(message.author.id, {
				cooldown,
				lastUsage: Date.now()
			});
	}
	cmd.run({ client, message, args, embed });
};

module.exports.config = {
	name: "messageCreate"
};