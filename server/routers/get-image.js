const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const multer = require('multer');
const FCM = require('fcm-call');

const serverKey = 'AIzaSyAEtNKzCCgo53pg-027l2chvaD66QXtVNk';

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const testUserId = 77;

module.exports = (ormModels) => {
    const UserImage = ormModels.UserImage;
    const User = ormModels.User;


    router.post('/', upload.single('myImage'), async (req, res) => {
        const image = req.file.buffer;
        //TO DO: User ID to be included in request from device
        const userId = testUserId;
        await UserImage.create({ userId, image })
        res.status(200).send('Image saved');
        const user = await User.findByPk(userId);
        if (user) {
            referenceKey = user.fcmToken;
            let title = 'New Guest';
            let message = 'Has arrived at the door';
            FCM.FCM(serverKey, referenceKey, title, message);
        }
    })
    return router;
}
