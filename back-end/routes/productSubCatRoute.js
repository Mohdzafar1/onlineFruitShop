const express =require('express')
const { addProductSubCategory, getProductSubCategory } = require('../controller/productSubCatController')
const router=express.Router()




router.post("/addProductSubCategory",addProductSubCategory)
router.get("/getProductSubCategory",getProductSubCategory)



module.exports=router

