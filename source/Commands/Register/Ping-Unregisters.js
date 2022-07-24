const Discord = require('discord.js');
const config = require("../../Configurations/Server_Settings");
const moment = require("moment");
moment.locale("tr");

module.exports = {
    config: {
        aliases: [],
        name: "kayıtsız-etiketle",
        help: "kayıtsız-etiketle",
        enabled: true,
        staffLevel: 1
    },
    run: async ({ client, message, args, embed }) => {

        message.channel.send({content:`${message.guild.roles.cache.get(config.Roles.Member.unregisteredRole)}`, embeds: [ embed.setDescription(`Hey, yönetici sizi teyit kanallarına çağırıyor...`)]})

  }
};