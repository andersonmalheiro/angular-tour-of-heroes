const Hero = require('../models/Hero');

module.exports = {
    async index(req, res){
        const heroes = await Hero.find({}).sort('-createdAt');

        return res.json(heroes);
    },

    async create(req, res){
        const hero = await Hero.create(req.body);

        req.io.emit('hero', hero);

        return res.json(hero);
    }
}