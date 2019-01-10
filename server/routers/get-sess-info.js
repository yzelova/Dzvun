const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

module.exports = (csrfProtection) => {
    router.get('/user', (req, res) => {
        const user = req.user;
        res.json({user})
    })
    router.get('/csrf', csrfProtection, (req, res) => {
        res.json({csrfToken: req.csrfToken()});
    })
    return router;
}