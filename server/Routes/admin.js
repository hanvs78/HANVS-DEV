const express = require('express')
const { adminRole } = require('../controllers/Admin')
const router = express.Router()

//http://localhost:5000/api/register OR login OR viewUser
router.get('/Admin', adminRole)

module.exports = router