const config = require('../Configurations/Server_Settings');
const { nameTag } = require('../Configurations/Server_Settings');
const tagMode = require('../Schemas/TagMode');

module.exports = async(oldUser, newUser) => {

    let tags = config.Others.Tag.All;
  let ikinciTag = config.Others.Tag.secondaryTag;

  let member = newUser.client.guilds.cache.get(config.guildID).members.cache.get(newUser.id);
  let tagrol = member.guild.roles.cache.get(`${config.Roles.Member.tagRole}`);
  let tagsayı = member.guild.members.cache.filter(user => config.Others.Tag.All.some(tag => user.user.tag.includes(tag))).size;
  
  if (tags.some(t => !oldUser.user.tag.includes(t) || newUser.user.tag.includes(t)))  {
    await member.roles.add(tagrol).catch(console.error);
    if (member.manageable) member.setNickname(member.displayName.replace(ikinciTag, nameTag[0])).catch(console.error);
  
    this.client.channels.cache.get(config.Channels.tagLogChannel).send(`
${member} adlı üye tagımızı kullanıcı adına ekleyerek ailemize katıldı! Toplam taglı üyemiz: (${tagsayı})`).catch();
  }
  else if (tags.some(t => oldUser.user.tag.includes(t) || !newUser.user.tag.includes(t)))  {
  
    if (tagMode && tagMode.boolean == true) {
      if(!member.roles.cache.has(config.Roles.Member.vipRole) && !member.roles.cache.has(config.Roles.Member.boosterRole) && !member.roles.cache.has(config.Roles.Member.jailRole) && !member.roles.cache.has(config.Roles.Member.suspectRole)) return await member.roles.set([config.Roles.Member.unregisteredRole]).catch(console.error);
     } else
    if (member.manageable) member.setNickname(member.displayName.replace(nameTag[0], ikinciTag)).catch(console.error);
      
    let roles = member.roles.cache.filter(e => e.managed || e.position < tagrol.position);
    await member.roles.set(roles).catch();

    if (member.roles.cache.get(`${config.Roles.Staff.registerHammer}`)) {
      this.client.channels.cache.get(config.Channels.tagLogChannel).send(`
${newUser} adlı üye tagımızı bıraktı, otomatik olarak yetkiler alındı.
Bırakmadan önceki yetkileri:\n${member.roles.cache.filter(rol => tagrol.position <= rol.position && !rol.managed).map(x => `<@&${x.id}>`)}
    `);
    } else
      this.client.channels.cache.get(config.Channels.tagLogChannel).send(`
${member} adlı üye tagımızı kullanıcı adından silerek ailemizden ayrıldı! Sunucuda bulunan toplam taglı üyemiz: (${tagsayı})`).catch();
  }

};

module.exports.config = {
    name:'userUpdate'
}