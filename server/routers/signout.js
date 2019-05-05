const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));

module.exports = (csrfProtection) => {

    router.get('/', (req, res) => {
        req.logout();
        res.json();
    })

    return router;
}