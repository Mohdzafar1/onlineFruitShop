const express=require("express")
const { addProduct, getProduct } = require("../controller/productController")
const router=express.Router()
const upload=require("../middleware/multerConfig")



router.post("/addproduct",upload.fields([{name:"product_image",maxCount:1}]) , addProduct)
router.get("/getProduct",getProduct)



module.exports=router
