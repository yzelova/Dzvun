const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const multer = require('multer');

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
        })
    return router;
}
