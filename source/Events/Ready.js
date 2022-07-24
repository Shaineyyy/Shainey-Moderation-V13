const client = global.client;
const settings = require("../Configurations/Client_Settings.js");
const config = require("../Configurations/Server_Settings.js");
const { joinVoiceChannel } = require("@discordjs/voice");
const penals = require("../Schemas/Penals");

module.exports = async () => {
  const act = settings.clientPresences;
  const index = Math.floor(Math.random() * (act.length));

client.user.setActivity(`${act[index]}`, {
  type: "STREAMING",
  url: "https://www.twitch.tv/7shainey"});

const VoiceChannel = client.channels.cache.get(settings.voiceChannel);
joinVoiceChannel({
  channelId: VoiceChannel.id,
  guildId: VoiceChannel.guild.id,
  adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
  selfDeaf: true,
selfMute:true
}); 

setInterval(async() => {  

  const guild = client.guilds.cache.get(config.guildID);
  if (!guild) return;

  const finishedPenals = await penals.find({ guildID: guild.id, active: true, temp: true, finishDate: { $lte: Date.now() } });
  finishedPenals.forEach(async (fp) => {
    const member = guild.members.cache.get(fp.userID);
    if (!member) return;
    if (fp.type === "CHAT-MUTE") {
      fp.active = false;
      await fp.save();
      await member.roles.remove(config.Roles.Member.MutedRole);
      client.channels.cache.get(config.Channels.muteLogChannel).send({ content: `${member}, Kullanıcının susturulma süresi doldu.` });
    }
    if (fp.type === "TEMP-JAIL") {
      fp.active = false;
      await fp.save();
      await member.setRoles(config.Roles.Member.unregisteredRole);
  
    } 
    if (fp.type === "VOICE-MUTE") {
      if (member.voice.channelID) {
        fp.removed = true;
        await fp.save();
        if (member.voice.serverMute) member.voice.setMute(false);
      }
      fp.active = false;
      await fp.save();
      member.roles.remove(config.Roles.Member.VoiceMuted);
    }
  });

  const activePenals = await penals.find({ guildID: guild.id, active: true });
  activePenals.forEach(async (ap) => {
    const member = guild.members.cache.get(ap.userID);
    if (!member) return;
    if (ap.type === "CHAT-MUTE" && member.roles.cache.get(config.Roles.Member.MutedRole)) return member.roles.add(config.Roles.Member.MutedRole);
    if ((ap.type === "JAIL" || ap.type === "TEMP-JAIL") && !member.roles.cache.get(config.Roles.Jailed)) return member.setRoles(config.Roles.Member.jailRole);
    if (ap.type === "VOICE-MUTE") {
      if (!config.Roles.Member.MutedRole.some((ms) => member.roles.cache.has(ms))) member.roles.add(config.Roles.Member.MutedRole);
      if (member.voice.channelID && !member.voice.serverMute) member.voice.setMute(true);
    }
  });
}, 15000);

};

module.exports.config = {
  name: "ready",
};
