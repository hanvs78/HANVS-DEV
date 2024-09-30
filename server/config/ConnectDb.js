// ຕິດຕໍໍ່ຖານຂໍ້ມູນ mongoDb.connect ແລະ ສ້າງຖານຂໍ້ມູນ Database 

const mongoose = require('mongoose')
const connectDB = async()=>{
    try {
        // ເຊື່ອມຕໍ່ຖານຂໍ້ມູນ ແລະ ພ້ອມສ້າງຖານຂໍ້ມູນໃໝ່ເປັນ Database
        // await mongoose.connect('mongodb://127.0.0.1:27017') - ການຕິດຕໍ່ຖານຂໍ້ມູນ mongodb
        // await mongoose.connect('mongodb://127.0.0.1:27017/Database')-ສ້າງຖານຂໍ້ມູນໃໝ່ຊື່ວ່າ: Database
        await mongoose.connect('mongodb://127.0.0.1:27017/Database')
        console.log('Database is connected!!!')
    } catch (error) {
        console.log(err)
    }
}

// ສົ່ງໂຄດຄຳສັ່ງອອກໄປໃຊ້ງານ ຢູ່ຟາຍ Server.js
module.exports = connectDB