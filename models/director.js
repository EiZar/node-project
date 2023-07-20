const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DirectorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String
    }
});

module.exports = mongoose.model('Director', DirectorSchema);