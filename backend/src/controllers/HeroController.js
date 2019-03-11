const Hero = require('../models/Hero');

module.exports = {
    async index(req, res){
        console.log("GET /heroes");
        const heroes = await Hero.find({}).sort('-likes');
        return res.json(heroes);
    },

    async detail(req, res) {
        console.log(`GET /heroes/${req.params.id}`);
        await Hero.findById(req.params.id, (err, hero) => {
            if (err) {
                return res.status(404).send(err);
            } else {
                console.log(err);
                return res.status(200).send(hero);
            }
        });
    },

    async create(req, res){
        console.log("POST /heroes");
        const hero = await Hero.create(req.body);
        req.io.emit('hero', hero);
        return res.json(hero);
    },

    async update(req, res) {
        console.log("PUT /heroes");
        let hero = await Hero.findById(req.params.id);
        hero.set(req.body);
        await hero.save();
        return res.status(200).send({hero});
    },

    async delete(req, res){
        console.log(`DELETE /heroes/${req.params.id}`);
        await Hero.findByIdAndDelete(req.params.id);
        return res.status(204).end(); 
    }
}