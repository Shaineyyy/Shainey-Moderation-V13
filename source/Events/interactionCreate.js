const Settings = require('../Configurations/Server_Settings');

module.exports = async(interaction, message) => {

    if(interaction.isButton()) {

      if(interaction.customId === "etkinlik") {
        let member = interaction.member
        if(member.roles.cache.has(Settings.Others.Acts.activity)) {
          await member.roles.remove(Settings.Others.Acts.activity);
          await interaction.reply({ content: `<@&${Settings.Others.Acts.activity}> rolü başarıyla üzerinizden aldım.`, ephemeral: true });
        } else {
          await member.roles.add(Settings.Others.Acts.activity);
          await interaction.reply({ content: `<@&${Settings.Others.Acts.activity}> rolünü üzerinize başarıyla ekledim.`, ephemeral: true });
        };
      };
      
      
      if(interaction.customId === "cekilis") {
        let member = interaction.member
        if(member.roles.cache.has(Settings.Others.Acts.giveaway)) {
          await member.roles.remove(Settings.Others.Acts.giveaway);
          await interaction.reply({ content: `<@&${Settings.Others.Acts.giveaway}> rolü başarıyla üzerinizden aldım.`, ephemeral: true });
        } else {
          await member.roles.add(Settings.Others.Acts.giveaway);
          await interaction.reply({ content: `<@&${Settings.Others.Acts.giveaway}> rolünü üzerinize başarıyla ekledim.`, ephemeral: true });
        };
      };

    }
}

module.exports.config = {
    name:'interactionCreate'
}