import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, link } from 'react-router-dom'
import { remove, create, getdata } from '../functions/product'

// loyout
import { Box, TextField, Button } from '@mui/material'
// Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// DeleteIcon
import DeleteIcon from '@mui/icons-material/Delete';
// EditOutlinedIcon
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


const FormProduct = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});
 

  useEffect(() => {
    // code...
    loadData();
  }, []);

  // Function { LoadData }
  const loadData = async () => {
    // await axios.get('http://localhost:5000/api/product')
      // .get("http://localhost:5000/api/product") - ໃຊ້ .ENV ເຂົ້າມາແທ່ນທີ່ຢູ່ URL
      // .get(process.env.REACT_APP_API + '/product')
      getdata()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  // Function ດັກຈັບທຸກໆເຫດການ ກໍລະນີປ້ອນຂໍ້ມູນເຂົ້າຟອມ
  const handleChange = (e) => {
    //console.log(e.target.name,e.target.value)
    // console.log(e.target.files)

    if (e.target.name === 'file'){
      setForm({
        ...form,
        [e.target.name]: e.target.files[0]
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
    }

  };

// ຍ້າຍຄຳສັງໄປເກັບໄວ້ຢູ່ໂຟເດີ້ function>product
  // save to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(form)
    // await axios.post(process.env.REACT_APP_API + '/product', form)

    const formWithImageData = new FormData()
    for ( const key in form){
      // console.log(key)
      formWithImageData.append(key, form[key])
    }

    //console.log(formWithImageData)

    create(formWithImageData)  
    .then((res) => {
        console.log(res.data);
        loadData()
      })
      .catch((err) => console.log(err));
  };

  // function Delete
  const handleRemove = async (id) => {
   // console.log(id)
    // await axios.delete(process.env.REACT_APP_API + '/product/' + id)
    // Calling function { remove }
    remove(id)
    .then((res)=>{
      console.log(res)
      loadData()
    })
    .catch((err)=> console.log(err))
  };

  return (
    <div>
      {/* HTML */}
      <h1> FormProducts </h1>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div> 
        <TextField 
        id="outlined-basic" 
        label="name" 
        name="name"
        onChange={(e) => handleChange(e)}
        variant="outlined" 
        />
      </div>
      <div>
        <TextField 
        id="outlined-basic" 
        label="detail" 
        name="detail"
        onChange={(e) => handleChange(e)}
        variant="outlined" 
        />
      </div>
      <div>
        <TextField 
        type="number"
        id="outlined-basic" 
        label="price" 
        name="price"
        onChange={(e) => handleChange(e)}
        variant="outlined" 
        />
      </div>
      <div>
        <TextField 
        type="file"
        id="outlined-basic" 
        label="file" 
        name="file"
        onChange={(e) => handleChange(e)}
        variant="outlined" 
        focused 
        />
      </div>

     <Button variant="contained" type="Submit">Submit</Button> 

    </form>

  {/* ຂໍ້ມູນຕາຕະລາງໃໝ່-ເລີ່ມ */}
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>N</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Detail</TableCell>
            <TableCell>File</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Delete</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data
            ? data.map((item, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.detail}</TableCell>
                  <TableCell>{item.file}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    <DeleteIcon color="error" onClick={()=>handleRemove(item._id)}/> 
                  </TableCell>
                  <TableCell>
                    <Link to={'/edit/'+item._id}>
                      <EditOutlinedIcon/>
                    </Link>
                  </TableCell>
              </TableRow>
              ))
          : null}

        </TableBody>
      </Table>
    </TableContainer>
    {/* ຂໍ້ມູນຕາຕະລາງໃໝ່-ສິ້ນສຸດ */}
    </div>
  );
};

export default FormProduct;
