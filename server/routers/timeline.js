const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')

module.exports = (ormModels) => {
    const UserImage = ormModels.UserImage;
    const User = ormModels.User


    router.post('/', async (req, res) => {
        const user = req.user ? req.user : req.body.email;
        let id;
        if (user.id) id = user.id;
        else {
            const userDb = await User.findOne({
                where: {
                    email: user
                }
            });
            id = userDb.id;
        }
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
        res.json({ imageRes })
    })


    return router;
}
