const { MessageEmbed } = require('discord.js');
const Config = require("../../Configurations/Server_Settings");
const Settings = require('../../Configurations/Client_Settings');

module.exports = {
	config: {
		aliases: ["help", "y", "h"],
		name: "yardım",
		enabled: true,
		cooldown:5000
	},

	run: async ({ client, message, args }) => {

		const list = client.commands
		.filter((x) => x.config.help)
		.sort((a, b) => b.config.help - a.config.help)
		.map((x) => `\`${Settings.prefix}${x.config.help}\``)
		.join("\n");

		message.reply({ embeds: [new MessageEmbed()
.setAuthor({name:message.member.displayName , iconURL:message.member.displayAvatarURL()})
.setDescription(`
Botta toplamda \`${client.commands.size}\` komut bulunmakta;

${list}
`)
] })

}};