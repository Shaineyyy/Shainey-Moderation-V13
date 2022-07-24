const { GuildMember, TextChannel, MessageEmbed } = require("discord.js");
const Penals = require("../Schemas/Penals");

module.exports = async function (client) {
    
	client.fetchUser = async (userID) => {
    try {
      return await client.users.fetch(userID);
    } catch (err) {
      return undefined;
    }
  };

  client.fetchBan = async (guild, userID) => {
    try {
      return await guild.fetchBan(userID);
    } catch (err) {
      return undefined;
    }
  };

  Promise.prototype.sil = function(time) {
    if (this) this.then(msg => { if (msg.deletable) {
      setTimeout(async() => {
  msg.delete().catch(e => {}); 
        }, time * 1000)
        } 
    });
};

  client.wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  client.penal = async (guildID, userID, type, active = true, staff, reason, temp = false, finishDate = undefined) => {
    let id = await Penals.find({ guildID });
    id = id ? id.length + 1 : 1;
    return await new Penals({ id, userID, guildID, type, active, staff, reason, temp, finishDate }).save();
  };

  GuildMember.prototype.setRoles = function (roles) {
    if (!this.manageable) return;
    const newRoles = this.roles.cache.filter(x => x.managed).map(x => x.id).concat(roles);
    return this.roles.set(newRoles).catch(() => {});
  };

  GuildMember.prototype.hasRole = function (role, every = true) {
    return (Array.isArray(role) && (every && role.every((x) => this.roles.cache.has(x)) || !every && role.some((x) => this.roles.cache.has(x))) || !Array.isArray(role) && this.roles.cache.has(role))
  };

  TextChannel.prototype.error = async function (message, text) {
    const mythiney = await client.users.fetch("824682015244550174");
    const embed = new MessageEmbed()
      .setColor("RED")
      .setAuthor({ name: message.member.username, iconURL: message.member.displayAvatarURL({ dynamic: true }) })
      .setFooter({ text: "Shainey<3Mythe", iconURL: mythiney.avatarURL({ dynamic: true }) });
    this.send({ embeds: [embed.setDescription(text)] }).then((x) => { if (x.deletable) x.delete({ timeout: 10000 }); });
  };

  Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
  };
};
