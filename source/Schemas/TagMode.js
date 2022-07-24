const { Schema, model } = require('mongoose');

const schema = new Schema({
    guildID: { type: String, default: 0 },
    boolean: { type: Boolean, default: false }
});

module.exports = model("tagmode", schema);