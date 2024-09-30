const express = require('express');
const router = express.Router()

const { list, 
    read, 
    create, 
    update, 
    remove } = require('../controllers/Product')

// MiddleWare
const { auth } = require('../Middleware/auth')
const { upload } = require('../Middleware/upload')

//http://localhost:5000/api/product

// ກ່ອນນໍາໃຊ້ MiddleWare
// =========== ### ============
router.get('/product', list)
router.get('/product/:id', read)
router.post('/product', upload, create)
router.put('/product/:id', upload, update)
router.delete('/product/:id', remove)

// ຫຼັງການໃຊ້ MiddleWare
// router.get('/product', auth, list)
// router.get('/product/:id', auth, read)
// router.post('/product', auth, upload, create)
// router.put('/product/:id', auth, update)
// router.delete('/product/:id', auth, remove)

module.exports = router