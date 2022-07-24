const mongoose = require("mongoose");
const settings = require("../Configurations/Client_Settings.js");

mongoose.connect(settings.mongoURL, {
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
