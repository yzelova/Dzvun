const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')

const testUserId = 4;

module.exports = (ormModels) => {
    const UserImage = ormModels.UserImage;


    router.get('/', async  (req, res) => {
        const user = req.user;
        const id = testUserId;
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
            const p = `.\\uploads\\${image.imageName}`;
            try {
              const file = fs.readFileSync(path.resolve(p));
              imageRes.push(file);  
            } catch(e) {
                
            }
        });
        res.json({imageRes})
    })


    return router;
}
