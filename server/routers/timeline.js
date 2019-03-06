const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')

const testUserId = 77;

module.exports = (ormModels) => {
    const UserImage = ormModels.UserImage;


    router.get('/', async  (req, res) => {
        const user = req.user;
        const id = user.id;
        const images = await UserImage.findAll({
            where: {
                userId: id
            }, 
            order: [
                ['id', 'DESC']
            ]
        })
        const imageRes = [];
        images.forEach(image => {
            const p = '../Dzvun/uploads/'+image.imageName;
            const file = fs.readFileSync(path.resolve(p));
            imageRes.push(file);
        });
        res.json({imageRes})
    })


    return router;
}
