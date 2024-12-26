const express=require('express')
const router=express.Router()
const { registration, login, updateUser, getSingleUser, userAddress, getAllUsers } = require('../controller/userController')
const { verifyAdmin } = require('../middleware/verifyAdmin')
const { authenticateUser } = require('../middleware/authenticateUser')



router.post('/register',registration)
router.post('/login',login)
router.post('/updateAddress',userAddress)

router.put('/updateUser',updateUser)
router.get('/getSingleUser',getSingleUser)
router.get('/getAllUsers', authenticateUser, verifyAdmin, getAllUsers);




module.exports=router




