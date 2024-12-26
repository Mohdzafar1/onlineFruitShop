const express =require('express')
const { addProductCategory, getProductCategory } = require('../controller/categoryController')
const router=express.Router()




router.post("/addProductCategory",addProductCategory)
router.get("/getProductCategory",getProductCategory)



module.exports=router

