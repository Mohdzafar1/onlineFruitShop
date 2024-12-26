const express = require("express");
const { createOrder,getAllOrder } = require("../controller/orderController");
const upload = require("../middleware/multerConfig");
const { verifyAdmin } = require("../middleware/verifyAdmin");
const { authenticateUser } = require("../middleware/authenticateUser");


const router = express.Router();

// POST route for placing an order
// router.post("/newOrder",upload.fields([{name:"product_image",maxCount:1}]),createOrder)
router.post("/newOrder",createOrder)
router.get("/getAllOrder",authenticateUser, verifyAdmin,getAllOrder)




module.exports = router;
