const express = require('express')
const { register, login, viewUser } = require('../controllers/Auth')
const { auth } = require('../Middleware/auth')
const router = express.Router()



//http://localhost:5000/api/register OR login OR viewUser
router.post('/register', register)
router.post('/login', login)

// ກວດເບີ່ງຂໍ້ມູນຜູ້ໃຊ້ງານທັງໝົດ - ບໍ່ຜ່ານການເຂົ້າລະຫັດປ້ອງກັນ
router.get('/User', viewUser)

module.exports = router