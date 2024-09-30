// ສ້າງຕາຕະລາງ tblProduct ຢູ່ໃນຖານຂໍ້ມູນ mongoDb
const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    name:String,
    detail: {
        type: String
    },
    price: {
        type: Number
    },
    file: {
        type: String,
        default: 'Noimage.jpg'
    }
},{ timestamps: true })

module.exports = mongoose.model('tblProducts', productSchema)