const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function ( req, file, cb){
        cb(null, new Date().toISOString().replace(/[:]/g, "")+file.originalname);
    }
 });

const upload = multer({storage: storage});

const testUserId = 4;

module.exports = (ormModels) => {
    const UserImage = ormModels.UserImage;


    router.post('/', upload.single('myImage'), async (req, res) => {
        const imageName = req.file.filename;
        //TO DO: User ID to be included in request from device
        const userId = testUserId;
        await UserImage.create({userId, imageName})
        res.status(200).send('Image saved');
    })
    return router;
}
