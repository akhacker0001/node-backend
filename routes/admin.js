const express = require('express')
const app = express()
const router = express.Router()
const Admin = require("../controller/AdminController")
const { protectAdminRoute } = require('../middleware/middleware')

router.post('/login',Admin.login)


// subCategory 
router.post('/subCategory',[protectAdminRoute],Admin.createSubCategory)
router.get('/subCategory',[protectAdminRoute],Admin.getAlSubCategory)

// category route 

router.post('/category',Admin.login)


module.exports = router