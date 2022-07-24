const config = require("../../Configurations/Server_Settings");
const Discord = require("discord.js");
const moment = require("moment");
moment.locale("tr");

module.exports = {
    config: { 
        aliases: ["etkinlik"],
		name: "etkinlik-seçim",
		owner: true,
		enabled: true
    },
    run: async ({client, message, args, embed }) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için gerekli yetkilere sahip değilsin.`)] }).sil(3)
  
      let giveaway = new Discord.MessageButton()
          .setStyle('SUCCESS')
          .setEmoji('🎁')
          .setLabel('Çekiliş Katılımcısı')
          .setCustomId('cekilis')
  
      let activity = new Discord.MessageButton()
          .setStyle('SUCCESS')
          .setEmoji('🎉')
          .setLabel('Etkinlik Katılımcısı')
          .setCustomId('etkinlik')
  
  
      let row = new Discord.MessageActionRow()
          .addComponents(giveaway, activity)
  
      message.channel.send({ content:`Selamlar herkese, sunucumuz da bildirimlerden haberdar olmak isterseniz aşşağıdan butonlardan rollerinizi seçebilirsiniz.
  
      🔮 Çekilişlerden anında haberdar olmak için \`🎁\` butonuna basınız.
        
      🔫 Etkinlik bildirimlerinden anında haberdar olmak için \`🎉\` basınız.
  
      `, components: [row]  }) ;
  
    }
}
