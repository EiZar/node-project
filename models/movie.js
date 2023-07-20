const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MovieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    director: {
        type: Schema.Types.ObjectId,
        ref: "Director"
    },
    review: {
        type: {
            rating: {
                type: Number,
                required: true,
            },
            body: {
                type: String,
                required: true,
            }
        },
        required: false,
    },
    year: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Movie', MovieSchema);