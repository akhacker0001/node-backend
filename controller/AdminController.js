const Admin = require("../model/Admin.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { createAdminToken } = require("../utils/functions");
const ApiResponse = require("../utils/responseSchema");
const _ = require('lodash')
const SubCategory = require("../model/SubCategory")

exports.login = catchAsync(async (req,res,next) => {
    let email = _.get(req,'body.email','');
    let password = _.get(req,'body.password','');
    console.log(email)

    let AdminUser = await Admin.findOne({email}).select('+password')
    console.log(AdminUser,"AdminUser")
    if(!AdminUser) return next(new AppError('not found',400));
    if(!await AdminUser.correctPassword(password,AdminUser.password)) return next(new AppError('invalid password',400));

    let token  = createAdminToken(AdminUser.id)
    // await
    console.log()


    res.status(200).json(new ApiResponse({message:"success",data:{token}}))


})


exports.createSubCategory = catchAsync (async (req,res,next) => {
    let data = _.get(req,'body',{});
    if(await SubCategory.findOne({name:data.name})){
        return next(new AppError('aleardy exist',400))
    }
    let subCategory =  await SubCategory.create(data)
    res.status(201).json(new ApiResponse({message:"created successfully",data:{subCategory}}))
})

exports.getAlSubCategory = catchAsync (async (req,res,next) => {
    let subCategories =  await SubCategory.find({}).populate({
        path:"category",
        options: {strictPopulate: false}
    })
    res.status(200).json(new ApiResponse({message:"created successfully",data:{subCategories}}))
})




exports.createCategory = catchAsync(async (req, res, next) => {

})