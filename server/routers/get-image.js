const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const multer = require('multer');
const FCM = require('fcm-call');

const serverKey = 'AIzaSyAEtNKzCCgo53pg-027l2chvaD66QXtVNk';

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

//const testUserId = 77;

//const deviceAddress = 'B8:27:EB:10:56:F3';

module.exports = (ormModels) => {
    const UserImage = ormModels.UserImage;
    const User = ormModels.User;
    const Device = ormModels.Device;
    const UserDevice = ormModels.UserDevice;


    router.post('/', upload.single('myImage'), async (req, res) => {
        const image = req.file.buffer;
        const deviceAddress = req.body.deviceId;
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
                await UserImage.create({ userId, image })
                res.status(200).send('Image saved');
                const user = await User.findByPk(userId);
                if (user) {
                    referenceKey = user.fcmToken;
                    let title = 'New Guest';
                    let message = 'Has arrived at the door';
                    FCM.FCM(serverKey, referenceKey, title, message);
                }
            }

        }

    })
    return router;
}
