// ສ້າງຕາຕະລາງ User ຢູ່ໃນຖານຂໍ້ມູນ mongoDb
const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name:String,
    password: {
        type: String
    }
},{ timestamps: true })

module.exports = mongoose.model('tblUsers', userSchema)