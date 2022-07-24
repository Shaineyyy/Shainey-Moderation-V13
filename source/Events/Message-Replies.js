const { MessageEmbed, } = require("discord.js");
const config = require("../Configurations/Server_Settings");

module.exports = async message => {

    if (message.content.toLowerCase() === "tag" || message.content.toLowerCase() === ".tag" || message.content.toLowerCase() === "!tag") {
    message.reply({ content: `\`${config.Others.Tag.All}\`` })
    }

};

module.exports.config = {
    name: "messageCreate"
}