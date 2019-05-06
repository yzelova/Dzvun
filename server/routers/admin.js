const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

module.exports = (passport, ormModels) => {

    const Device = ormModels.Device;

    router.post('/add-device', async (req, res) => {
        const deviceAddress = req.body.address;
        const device = await Device.findOne({ where: { deviceAddress } });
        if (device) {
            return res.status(400).send('exists');
        }
        await Device.create({ deviceAddress });
        return res.json();
    })

    router.get('/view-devices', async (req, res) => {
        const devices = await Device.findAll();
        return res.json(devices);
    })

    router.post('/remove-device', async(req, res) => {
        const id = req.body.id;
        await Device.destroy({where: {id}});
        return res.json();
    })

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

    router.post('/logout', (req,res, next) => {
        req.logout();
        return res.json();
    })

    return router;
}