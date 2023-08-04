const AppError = require("./appError");
const catchAsync = require("./catchAsync");
const jwt = require('jsonwebtoken');
const fs = require('fs')

exports.generateSixDigitRandomNumber = () => {
    const min = 100000; // Smallest six-digit number (100,000)
    const max = 999999; // Largest six-digit number (999,999)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  exports.createPagination = ({totalData,pageLimit,currentPage}) => {
    let offset =( Number(pageLimit) * (Number(currentPage) -1))
    let total = totalData;
    let page = Number(currentPage);
    let limit = Number(pageLimit);
    let totalPage = Math.ceil(totalData / Number(pageLimit))
    // console.log(offset,"offset")
    // if(offset <= 0)  new AppError("please provide page no 1 to n",400) 
    return {
      offset:offset,
      pagination:{total,page,limit,totalPage}
    }
  }
  
exports.passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;



exports.createAdminToken = (id) => {
  const privateKey = fs.readFileSync(require.resolve('../config/Private.pem'),'utf8');
  // console.log(privateKey,"privateKey")
  var token = jwt.sign({id}, privateKey)
  return token
}