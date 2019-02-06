const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function ( req, file, cb){
        cb(null, new Date().toISOString().replace(/[:]/g, "")+file.originalname);

    }
});

const upload = multer({storage: storage});



module.exports = () => {
    router.post('/',upload.single('productImage'), (req, res) => {
        console.log(req.file);
    })
    return router;
}