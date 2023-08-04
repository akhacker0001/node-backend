const express = require('express')
const app = express()
const router = express.Router()
const Admin = require("../controller/AdminController")
const { protectAdminRoute } = require('../middleware/middleware')
const { uploadFiles } = require('../middleware/uploadMiddleware')

router.post('/login',Admin.login)


// subCategory 
router.post('/parentCategory',[protectAdminRoute],Admin.createParentCategory)
router.get('/parentCategory',[protectAdminRoute],Admin.getAlParentCategory)

// category route 
router.post('/category',[protectAdminRoute],Admin.createCategory)
router.get('/category',[protectAdminRoute],Admin.getAllCategory)

// router.post('/category',Admin.login)


// product 
router.post('/product',[protectAdminRoute,uploadFiles('product_image').array('images')],Admin.createProduct)
router.get('/product',[protectAdminRoute],Admin.getAllProducts)


// colors 

// router.get('/color',[protectAdminRoute],Admin.getAllColors)


module.exports = router