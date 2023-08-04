const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const fs = require('fs')
const jwt = require('jsonwebtoken');
exports.protectAdminRoute = catchAsync ( async (req,res, next) => {
const token = req.headers.authorization;

// console.log(req.headers.authorization)
  // if (!token) {
  //   return next(new AppError("No token provided.", 401));
  // }
  // const privateKey = fs.readFileSync(require.resolve('../config/Private.pem'),'utf8');
  // jwt.verify(token, privateKey, async (error, decoded) => {
  //   if (error) {
  //     console.log(error,"error")
  //     return next(new AppError(_.get(error,'message',"").includes('jwt expired') ? "token expired" : "Failed to authenticate token", 500));
  //   }
  //   req.id = decoded.id
  //   // Token is valid, proceed to the next middleware or route handler
  //   next();
  // });

  next()


})