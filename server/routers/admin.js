//Пътища, използвани в админ панела
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

module.exports = (passport, ormModels) => {

    const Device = ormModels.Device;

    //Добавяне на ново съществуващо устройство
    router.post('/add-device', async (req, res) => {
        const deviceAddress = req.body.address;
        const device = await Device.findOne({ where: { deviceAddress } });
        if (device) {
            return res.status(400).send('exists');
        }
        await Device.create({ deviceAddress });
        return res.json();
    })

    //Преглед на всички налични устройства
    router.get('/view-devices', async (req, res) => {
        const devices = await Device.findAll();
        return res.json(devices);
    })

    //Премахване на налично устройство
    router.post('/remove-device', async(req, res) => {
        const id = req.body.id;
        await Device.destroy({where: {id}});
        return res.json();
    })

    //Вход в админ панела
    router.post('/login', (req, res, next) => {
        passport.authenticate('local-login-admin', function (err, user) {
            if (err) {
                console.error(err);
                return res.status(400).send();
            }
            req.logIn(user, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(400).send();
                }
                req.session.user = req.user;
                return res.json();
            });
        })(req, res, next);
    })

    //Изход от админ панела
    router.post('/logout', (req,res, next) => {
        req.logout();
        return res.json();
    })

    return router;
}