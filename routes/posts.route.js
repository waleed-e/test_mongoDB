const express = require('express')
const router = express.Router()
const postsController = require('../controllers/posts.controller')
router.get('/',postsController.getAllPosts)
router.get('/:id',postsController.getOnePost)
router.post('/',postsController.addOnePost)
router.patch('/:id',postsController.updatePost)
router.delete('/:id',postsController.deleteOnePost)












module.exports = router