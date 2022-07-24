const { MessageEmbed } = require("discord.js");
const config = require('../../Configurations/Client_Settings')

module.exports = {
    config: {
	name: 'eval',
    aliases:[],
    enabled:true,
    owner:true
    },
	run: ({client, message, args}) => {

               const embed = new MessageEmbed()
              .setColor("GREEN")
              .setDescription(`Şuan alıyorsun tokeni`)
               if (args[0] === "client.token") return message.channel.send({embeds: [embed]}).sil(5)
               if(!args[0]) return message.channel.send("Kod girin").sil(3)
            
                try {
                var code = args.join(" ");
                var evaled = eval(code);
          
                if (typeof evaled !== "string")
                  evaled = require("util").inspect(evaled);
          
                message.channel.send(clean(evaled)).sil(10)
              } catch (err) {
                message.channel.send(`\`HATA\` \`\`\`xl\n${clean(err)}\n\`\`\``).sil(10)
              }
          function clean(text) {
            if (typeof(text) === "string")
              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
          }
	},
};