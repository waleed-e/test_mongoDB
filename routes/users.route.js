// get all users 
// register 
// login


const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users.controller')
const verifyToken = require('../middleware/verifyToken')
const multer  = require('multer')

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("FILE",file);
        
        cb(null, '../uploads')
      }
})

const upload = multer({ storage:diskStorage})



router.get('/',verifyToken,usersController.getAllUsers)
router.post('/register',upload.single('avater'),usersController.register)
router.post('/login',usersController.login)






module.exports = router