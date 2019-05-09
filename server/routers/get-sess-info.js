const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

module.exports = (csrfProtection) => {
    //Път за получаване на активния потребител
    router.get('/user', (req, res) => {
        const user = req.user;
        if(user) res.json({user})
        else res.status(403).send("not logged")
    })
    return router;
}