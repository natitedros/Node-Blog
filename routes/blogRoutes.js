const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogController')

const { requireAuth} = require('../middleware/authMiddleware')

router.get('/', blogController.blog_index)

router.get('/create', requireAuth, blogController.blog_create_get)

router.post('/', blogController.blog_create_post)

router.get('/:id', blogController.blog_details)

router.delete('/delete/:id', requireAuth, blogController.blog_delete)

router.get('/update/:id', requireAuth, blogController.blog_update_get)

router.post('/update/:id', blogController.blog_update_put)

module.exports = router
