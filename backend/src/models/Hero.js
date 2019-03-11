const mongoose = require('mongoose');

const HeroSchema = new mongoose.Schema({
    name: String,
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Hero', HeroSchema);