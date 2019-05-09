const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));
const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = (ormModels) => {
    const User = ormModels.User;
    const Device = ormModels.Device;
    const UserDevice = ormModels.UserDevice;
    const UserRequestedImage = ormModels.UserRequestedImage;

    router.post('/get-state', async (req, res) => {
        const deviceAddress = req.body.device;
        const device = await Device.findOne({
            where: {
                deviceAddress
            }
        })
        if (device) {
            const deviceId = device.id;
            const userDevice = await UserDevice.findOne({
                where: {
                    deviceId
                }
            })
            if (userDevice) {
                const userId = userDevice.userId;
                const user = await User.findOne({
                    where: {
                        id: userId
                    }
                })
                res.json(user.liveImageRequested);
            }
        }
    })

    router.post('/post-image', upload.single('myImage'), async (req, res) => {
        const image = req.file.buffer;
        const deviceAddress = req.body.device;
        const device = await Device.findOne({
            where: {
                deviceAddress
            }
        })
        if (device) {
            const deviceId = device.id;
            const userDevice = await UserDevice.findOne({
                where: {
                    deviceId
                }
            })
            if (userDevice) {
                const userId = userDevice.userId;
                await UserRequestedImage.create({
                    userId,
                    image
                })
                await User.update({
                    liveImageRequested: false
                }, {
                        where: { id: userId }
                    })
                res.json();
            }
        }
    })

    router.post('/get-image', async (req, res) => {
        const email = req.body.user;
        if (email) {
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (user) {
                const id = user.id;
                const userRequestedImage = await UserRequestedImage.findOne({
                    where: {
                        userId: id
                    }
                })
                if (userRequestedImage) {
                    res.json({ image: userRequestedImage.image });
                } else {
                    res.status(400).send('no image');
                }
            }
        }
    })

    router.post('/delete-image', async (req, res) => {
        try {
            const email = req.body.email;
            if (email) {
                const user = await User.findOne({
                    where: {
                        email
                    }
                })
                if (user) {
                    await UserRequestedImage.destroy({
                        where: { userId: user.id }
                    })
                    res.json();
                }
            }
        } catch (e) {
            res.status(400).send();
        }

    })

    router.post('/set-state', async (req, res) => {
        try {
            const email = req.body.email;
            if (email) {
                const user = await User.findOne({
                    where: {
                        email
                    }
                })
                if (user) {
                    await User.update({
                        liveImageRequested: true
                    }, {
                            where: { id: user.id }
                        })
                    res.json();
                }
            }

        } catch (e) {
            res.send(400).send(e);
        }
    })
    return router;
}
