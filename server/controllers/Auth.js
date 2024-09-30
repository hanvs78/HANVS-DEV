// import ຕາຕະລາງ tblUsers ຈາກຟາຍ Users
const tblUsers = require('../Models/Users');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

// ການລົງທະບຽນຊື່ ແລະ ລະຫັດ ຜູ້ໃຊ້ງານ
exports.register = async (req, res) => {
  try {
    // 1.CheckUser
    const { name, password } = req.body;
    var user = await tblUsers.findOne({ name });

    if (user) {
      return res.send("User Already Exists!!!").status(400);
    }

    // 2.Encrypt - ການເຂົ້າລະຫັດຜ່ານ
    const salt = await bcrypt.genSalt(10);
    user = new tblUsers({
      name,
      password
    });
    user.password = await bcrypt.hash(password, salt);
    console.log(user);

    // 3. Save
    await user.save();
    res.send("Register Success");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!!");
  }
};

// ການເຂົ້າລະບົບໂດຍນໍາໃຊ້ ຊື່-ລະຫັດ
exports.login = async (req, res) => {
  try {
    //code
    // 1. Check User
    const { name, password } = req.body;
    var user = await tblUsers.findOneAndUpdate({ name }, { new: true });
    console.log(user);

    // ຖ້າມີຂໍ້ມູນຊື່ຜູ້ໃຊ້ງານ
    if (user) {
      //const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = await bcrypt.compare(password, user.password)

      // ຖ້າຫາກລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ
      if (!isMatch) {
        return res.status(400).send("Password Invalid!!!");
      }
      // 2. Payload - ກຽມຂໍ້ມູນສົ່ງໄປໜ້າບ້ານ
      // ການເຂົ້າລະຫັດຂໍ້ມູນ ແລະ ສົ່ງອອກໄປໃຫ້ຜູ້ໃຊ້ຮັບຮູ້
      var payload = {
        user: {
          name: user.name
        }
      };
      // 3. Generate - ສ້າງລະຫັດເວັບໂທເກັນ
      jwt.sign(payload, "jwtsecret", { expiresIn: "2d" }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      });
    
      // ຖ້າບໍ່ມີຂໍ້ມູນຜູ້ໃຊ້ງານ
    } else {
      return res.status(400).send("User not found!!!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!!");
  }
};

// Get: ການກວດເບີ່ງຂໍ້ມູນຜູ້ໃຊ້ງານທັງໝົດໂດຍບໍ່ຜ່ານລະຫັດປ້ອງກັນ
exports.viewUser = async(req, res)=>{
  try{
      //code
      const reviewUser = await tblUsers.find({}).exec();
      res.send(reviewUser)
  }catch (err){
      //error
      console.log(err)
      res.status(500).send('Server Error')
  }
}


