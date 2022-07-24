const { Client, Collection, MessageEmbed, MessageButton, MessageActionRow, MessageFlags } = require('discord.js');
const { InviteManager } = require('fc_invite');
require('discord-reply');
const client = (global.client = new Client({ intents: 32767}));
const Settings = require('./source/Configurations/Client_Settings');
const Config = require('./source/Configurations/Server_Settings');
const mongoose = require('mongoose');

client.commands = new Collection();
client.aliases = new Collection();
client.cooldown = new Map();

require("./source/Utilities/eventHandler");
require("./source/Utilities/commandHandler");
require('./source/Utilities/functions')(client);
InviteManager({ client: client, mongoURL: Settings.mongoURL });

mongoose.connect(Settings.mongoURL, {
	useNewUrlParser: true, 
	useUnifiedTopology: true, 
	useFindAndModify: false

}).catch(() => { console.log(`[MONGO] Bağlantı kurulamadı.`); });

mongoose.connection.on("connected", () => {
	console.log(`[MONGO] Bağlantı kuruldu.`);
});
mongoose.connection.on("error", () => {
	console.error(`[MONGO] Bağlantıyı kontrol edin!`);
});

client.login(Settings.botToken)
.then(() => console.log(`[CLIENT] ${client.user.username}, Bağlantı kuruldu.`))
.catch((err) => console.log(`[CLIENT] Bağlantı kurulamadı. ${err}`));