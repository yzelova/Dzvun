const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const multer = require('multer');
const FCM = require('fcm-call');

const serverKey = 'AIzaSyAEtNKzCCgo53pg-027l2chvaD66QXtVNk'; 
const referenceKey = 'd-m_R5nvBe0:APA91bEN7xBJK8ZnmJ0rRZny_WTwMPo7D0_t1nIg2e4Q7wrAOZeSdhFgPxjXKx31g2Hqzd8S0SE1TJifRvLNvvCFoiMdMWpzFoIIVaMliVEdSPEmjgVcP3BWXKGUJl-OWgIsKGaxQaWk'; //Device Key   

const storage = multer.memoryStorage();

const upload = multer({storage: storage});

const testUserId = 1;

module.exports = (ormModels) => {
    const UserImage = ormModels.UserImage;


    router.post('/', upload.single('myImage'), async (req, res) => {
        const image = req.file.buffer;
        //TO DO: User ID to be included in request from device
        const userId = testUserId;
        await UserImage.create({userId, image})
        res.status(200).send('Image saved');
        let title = 'New Guest';
        let message = 'Has arrived at the door';
        FCM.FCM(serverKey, referenceKey, title, message);
        })
    return router;
}
