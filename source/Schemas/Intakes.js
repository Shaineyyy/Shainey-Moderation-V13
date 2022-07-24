const { Schema, model } = require('mongoose')

const schema = new Schema({
    guildID: String,
    userID: String,
    Names: Array

});

module.exports = model("reg_intakes", schema);