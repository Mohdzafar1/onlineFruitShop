require('dotenv').config();
require("./db/conn")
const express=require("express")
var cors = require('cors')
const bodyParser=require("body-parser")
const routerUser = require("./routes/userRoute")
const routerProduct = require("./routes/productRoute")
const routerProductSubCategory=require("./routes/productSubCatRoute")
const routerOrder =require("./routes/orderRoute")



const app=express()
const PORT=8080 || process.env.PORT


var corsOptions = {
  origin: ["https://online-fruit-shop-frontend.vercel.app","https://online-fruit-shop-frontend.vercel.app/","http://localhost:3000","http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(bodyParser.json());
// Middleware for parsing URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public/images", express.static("public/images"));
app.use("/uploads", express.static("uploads"));



app.use("/api",routerUser)
app.use("/api",routerProduct)
app.use("/api",routerProductSubCategory)
app.use("/api",routerOrder)







app.listen(PORT,()=>{
  console.log(`server is running at http://localhost:${PORT}`)
})
