const Hero = require('../models/Hero');

module.exports = {
    async create(req, res){
        const hero = await Hero.findById(req.params.id);

        hero.set({likes: hero.likes + 1});

        await hero.save();

        req.io.emit('like', hero);

        return res.json(hero);
    }
};