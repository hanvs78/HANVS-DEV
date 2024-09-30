// ການຄວບຄຸ້ມຖານຂໍ້ມູນໃນການເພີ່ມຂໍ້ມູນ, ແກ້ໄຂ, ລົບ

// import ຕາຕະລາງ tblProduct ທີ່ຢູ່ໃນຟາຍ Product ອອກມາໃຊ້ງານ
const tblProduct = require('../Models/Product')
const fs = require('fs')

//Get: Read - ກວດເບີ່ງຂໍ້ມູນສິນຄ້າ ໂດຍໃຊ້ເລກ ID
exports.read = async(req, res)=>{
    try{
        //code
        const id = req.params.id
        const producted = await tblProduct.findOne({_id: id}).exec();
        res.send(producted)
    }catch (err){
        //error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
//Get: List - ກວດເບີ່ງຂໍ້ມູນສິນຄ້າທັງໝົດ ໂດຍບໍ່ມີເງື່ອນໄຂ
exports.list = async(req, res)=>{
    try{
        //code
        const producted = await tblProduct.find({}).exec();
        res.send(producted)
    }catch (err){
        //error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
//POST=CREATE: - ເພີ່ມຂໍ້ມູນສິນຄ້າເຂົ້າໃໝ່
exports.create = async(req, res)=>{
    try{
        //code
        var data = req.body
        if(req.file){
            data.file = req.file.filename
        }
        // console.log(data)
        // const producted = await tblProduct(req.body).save()
        const producted = await tblProduct(data).save()
        res.send(producted)
    }catch (err){
        //error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
//PUT=UPDATE: - ປັບປຸງຂໍ້ມູນສິນຄ້າ
exports.update = async(req, res)=>{
    try{
        //code
        const id = req.params.id
        var newData = req.body
          
        if(typeof req.file !== 'undefined'){
            newData.file = req.file.filename
            await fs.unlink('./uploads/' + newData.fileold, (err)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log('Edit success')
                }
            })
        }

        const updated = await tblProduct
        .findOneAndUpdate({_id:id}, newData,{new:true})
        .exec();
        res.send(updated)
    }catch (err){
        //error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
//DELETE: - ການລົບຂໍ້ມູນສິນຄ້າອອກຈາກຖານຂໍ້ມູນ
exports.remove = async(req, res)=>{
    try{
        //code
        const id = req.params.id
        const removed = await tblProduct
        .findOneAndDelete({_id:id})
        .exec();

        if (removed?.file){
            await fs.unlink('./uploads/' + removed.file, (err)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log('Remove success')
                }
            })
        }

        res.send(removed)
    }catch (err){
        //error
        console.log(err)
        res.status(500).send('Server Error')
    }
}
