const db = require("../model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { createAdminToken } = require("../utils/functions");
const ApiResponse = require("../utils/responseSchema");
const _ = require('lodash')
const bcrypt = require('bcryptjs');

exports.login = catchAsync(async (req,res,next) => {
    let email = _.get(req,'body.email','');
    let AdminUser = await db.Admin.findOne({where:{email}})
    console.log(AdminUser,"AdminUser")
    if(!AdminUser) return next(new AppError('not found',400));
    console.log(bcrypt.compareSync(_.get(AdminUser, 'password', ""), req.body.password),req.body.password,AdminUser.password)
    if (!bcrypt.compareSync(_.get(req, 'body.password', ""), AdminUser.password)) return next(new AppError("invalid password", 400))
    let token  = createAdminToken(AdminUser.id)
    res.status(200).json(new ApiResponse({message:"success",data:{token}}))
})


exports.createParentCategory = catchAsync (async (req,res,next) => {
    let data = _.get(req,'body',{});
    let parentCategory =  await db.ParentCategory.create(data)
    res.status(201).json(new ApiResponse({message:"created successfully",data:{parentCategory}}))
})

exports.getAlParentCategory = catchAsync (async (req,res,next) => {
    let parentCategories =  await db.ParentCategory.findAll({
        include:[{
            model:db.Category,
            as:'categories',
            attributes: {
                exclude: ['parentCategoryId']
              },
        }]
    })
    res.status(200).json(new ApiResponse({message:"created successfully",data:{parentCategories}}))
})




exports.createCategory = catchAsync(async (req, res, next) => {
    let data = _.get(req,'body',{});
    let category =  await db.Category.create(data)
    res.status(201).json(new ApiResponse({message:"created successfully",data:{category}}))

})

exports.getAllCategory = catchAsync (async (req,res,next) => {
    let categories =  await db.Category.findAll({
        include:[{
            model:db.SubCategory,

            as:'subCategory'
        }]
    })
    res.status(200).json(new ApiResponse({message:"success",data:{categories}}))
})



exports.createProduct = catchAsync(async (req,res,next) =>{ 
    let name = _.get(req,'body.name','')
    let metaData = JSON.parse(_.get(req,'body.meta','{}'))
    let colorsId = JSON.parse(_.get(req,'body.colorsId','[]'))
    let price = JSON.parse(_.get(req,'body.price','{}'));
    let title = _.get(req,'body.title','')
    let Title = await db.Title.create({titleName:title}) 
    let images = req.files;
    let allColors = await db.Color.findAll({
        where:{
            id:colorsId
        }
    })
    allColors = allColors.map(ele=>ele.id)

    console.log(allColors)

    console.log(name,"name")

    let Product = await db.Product.create({name,titleId:Title.id});
    Product.addColor(allColors)
    metaData['productId'] = Product.id;
    price['productId'] = Product.id;
    await db.Price.create(price)
    await db.Meta.create(metaData);

    let productImages = images.map(ele=>({
        imagePath:ele.filename,
        productId:Product.id
    }))

    console.log(productImages,"productImages")

    await db.ProductImages.bulkCreate(productImages)


  

    res.status(200).json(new ApiResponse({message:"created successfullt",product:Product}))


})

exports.getAllProducts = catchAsync ( async (req, res, next) => {
    let products = await db.Product.findAll({
        include:[
            {
                model:db.Meta,
                as:'meta',
                attributes: {
                    exclude: ['productId']
                  },
            },
            {
                model:db.ProductImages,
                as:'images',
                attributes: {
                    exclude: ['isDeleted']
                  },
            },
            {
                model:db.Color,
                as:'colors',
                through: { attributes: [] }
            },
            {
                model:db.Price,
                as:'prices',
                attributes: {
                    exclude: ['productId']
                  },
                // through: { attributes: [] }
            }
        ]
    })

    res.status(200).json(new ApiResponse({message:'success',data:{products}}))
})


exports.createColor = catchAsync(async (req,res,next) => {

})