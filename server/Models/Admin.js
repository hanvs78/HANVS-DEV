// ສ້າງຕາຕະລາງ tblAdmin ຢູ່ໃນຖານຂໍ້ມູນ mongoDb
const mongoose = require('mongoose')
const adminSchema = mongoose.Schema({
    name:String,
    detail: {
        type: String
    },
    role: {
        type: Number
    }
},{ timestamps: true })

module.exports = mongoose.model('tblAdmin', adminSchema)