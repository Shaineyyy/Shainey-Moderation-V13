const config = require('../../Configurations/Server_Settings');
const tagMode = require('../../Schemas/TagMode');

module.exports = {
    config: {
        aliases: ["tagmod","tagmode","taglı-alım"],
        name: "taglıalım",
        help: "taglıalım [Aç/Kapat]",
        enabled: true,
        staffLevel: 1

    },

    run: async({ client, message, args, embed }) => {

        let select = args[0];
        if(!args[0]) { message.reply({ embeds: [ embed.setDescription(`Argüman yetersizliğinden komut iptal edildi. [\`Aç/Kapat\`]`) ]}).sil(4); }

        if(args[0] === "aç") {
            let mod = await tagMode.findOne({guildID: message.guild.id })
    
    if(!mod)  { 
        new tagMode({ guildID: message.guild.id, boolean: true }).save();
        return message.reply({ embeds: [ embed.setDescription(`Taglı alım modu başarıyla açıldı.`) ]}).then(message.react(config.Others.Emojis.check)).sil(6);
    }
   if(mod && mod.boolean == true) { 
    return message.reply({ embeds: [ embed.setDescription(`Taglı alım modu zaten açık.`) ]}).then(message.react(config.Others.Emojis.check)).sil(6);
   } else
    { 
    mod.boolean = true;
    mod.save(); 
    return message.reply({ embeds: [ embed.setDescription(`Taglı alım modu başarıyla açıldı.`) ] }).then(message.react(config.Others.Emojis.check)).sil(6);
    }
        } else if(args[0] === "kapat") {
            let mod = await tagMode.findOne({ guildID: message.guild.id })
    
    if(!mod)  { 

      new tagMode({ guildID: message.guild.id, boolean: false }).save();
      return message.reply({ embeds: [ embed.setDescription(`Taglı alım modu başarıyla kapandı.`) ]}).then(message.react(config.Others.Emojis.check)).sil(6);

    }
    if(mod && mod.boolean == false) { 

      return message.reply({ embeds: [ embed.setDescription(`Taglı alım modu zaten kapalı.`) ]}).then(message.react(config.Others.Emojis.check)).sil(6);

    } else {

      mod.boolean = false; 
      mod.save();  
      return message.reply({ embeds: [ embed.setDescription(`Taglı alım modu başarıyla kapandı.`) ]}).then(message.react(config.Others.Emojis.check)).sil(6);

    }
        }
}
};