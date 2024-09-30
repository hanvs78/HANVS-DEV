const tblAdmin = require('../Models/Admin');

exports.adminRole = async(req, res)=>{
    try{
        //code
        const adminRule = await tblAdmin.find({}).exec();
        res.send(adminRule)
    }catch (err){
        //error
        console.log(err)
        res.status(500).send('Server Error')
    }
  }