const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')

const testUserId = 1;

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
        images.forEach(m => {
               imageRes.push(m.image);
        });
        res.json({imageRes})
    })


    return router;
}
