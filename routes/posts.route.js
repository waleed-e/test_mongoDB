const express = require('express')
const router = express.Router()
const postsController = require('../controllers/posts.controller')
const verifyToken = require('../middleware/verifyToken')
const allowedTo = require("../middleware/allowedTo")
router.get('/',postsController.getAllPosts)
router.get('/:id',postsController.getOnePost)
router.post('/',verifyToken,postsController.addOnePost)
router.patch('/:id',postsController.updatePost)
router.delete('/:id',verifyToken, allowedTo('ADMIN',"MANGER"),postsController.deleteOnePost)












module.exports = router