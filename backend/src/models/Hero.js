const mongoose = require('mongoose');

const HeroSchema = new mongoose.Schema({
    name: String,
    role: String,
    description: String,
    active: Boolean,
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Hero', HeroSchema);