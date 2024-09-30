const express = require('express');
const app = express();
const port = 5000;
const { readdirSync } = require('fs');

const morgan = require('morgan')
const cors = require('cors')
const bodyParse = require('body-parser')

const connectDB = require('./config/ConnectDb')

connectDB()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParse.json({ limit: '10mb'}))

// const productRouters = require('./Routes/product')
// const authRouters = require('./Routes/auth')
//Route 1:
// app.get('/product', (req, res)=>{
//     res.send('Hellow EndPoint')
// })
//Route 2:
// app.use('/api',productRouters)
// app.use('/api', authRouters)

//Route 3: map ເປັນການ loop ດຶງຂໍ້ມູນອອກຈາກ Routes
//readdirSync('./Routes').map((r)=>{console.log(r)})
readdirSync('./Routes').map((r) => app.use('/api', require('./Routes/'+ r)))

app.listen(port,()=>{
    console.log('Server is running on port 5000 +++')
})