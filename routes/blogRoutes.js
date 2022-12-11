const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')

router.get('/', blogController.blog_index)

router.post('/', blogController.blog_create_post)

router.get('/create', blogController.blog_create_get)

router.get('/:id', blogController.blog_details)

router.delete('/:id', blogController.blog_delete)

router.get('/update/:id', blogController.blog_update_get)

router.post('/update/:id', blogController.blog_update_put)

module.exports = router
