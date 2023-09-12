const express = require('express')
const allproducts = require('../controller/allproducts')
const router = new express.Router()
const user = require('../controller/user')
const middleware = require('../middleware/token')

// grocery route
router.get('/grocery',allproducts.allgrocery)
// mobile route
router.get('/mobile',allproducts.allmobile)
// fashion
router.get('/fashion',allproducts.allfashion)
// electronics
router.get('/electronic',allproducts.allelectronic)
// appliance
router.get('/appliance',allproducts.allappliance)
// toys
router.get('/toy',allproducts.alltoys)
// homes
router.get('/home',allproducts.allhome)
// register
router.post('/register',user.register)
// login
router.post('/login',user.login)
// addwishlsit
router.post('/wishlist',middleware.webtoken,user.wishlist)
// getwishlists
router.get('/getwishlist',middleware.webtoken,user.getwishlist)
// addcart
router.post('/addcart',middleware.webtoken,user.addcart)
// deletewish
router.delete('/deletewishlist/:id',middleware.webtoken,user.deletewishlist)
// getacrt
router.get('/getcart',middleware.webtoken,user.getcart)
// plus
router.get('/plus/:id',middleware.webtoken,user.plus)
// minus
router.get('/minus/:id',middleware.webtoken,user.minus)
// cartdelete
router.delete('/cartdelete/:id',middleware.webtoken,user.cartdelete)
// saveaddress
router.post('/saveaddress',middleware.webtoken,user.saveaddress)
// allcartdelete
router.delete('/allcartdelete',middleware.webtoken,user.allcartdelete)
// cartvalue
router.get('/cartvalue/:username',user.cartvalue)

// saveorder
router.post('/saveorder',middleware.webtoken,user.orderdetails)

// viewproduct
router.get('/viewproduct/:id',allproducts.viewproduct)
// deleteaccount
router.post('/deleteaccount',middleware.webtoken,user.deleteaccount)
// deleteaddress
router.delete('/deleteaddress/:name',middleware.webtoken,user.deleteaddress)




module.exports=router