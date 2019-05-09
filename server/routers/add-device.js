const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));


module.exports = (ormModels) => {
    const User = ormModels.User;
    const Device = ormModels.Device;
    const UserDevice = ormModels.UserDevice;

    //Път за свързване на устройство с потребител
    router.post('/', async (req, res) => {
        try {
            const deviceAddress = req.body.device;
            const email = req.body.user;
            const user = await User.findOne({
                where: {
                    email
                }
            })
            const device = await Device.findOne({
                where: {
                    deviceAddress
                }
            })
            if (user && device) {
                await UserDevice.create({
                    userId: user.id,
                    deviceId: device.id
                })
                res.json();
            } else {
                res.send(400).send("user or device not found");
            }
        } catch (e) {
            res.send(400).send(e);
        }
    })
    return router;
}
