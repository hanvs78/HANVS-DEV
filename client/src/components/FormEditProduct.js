import React, { useEffect, useState} from 'react'
import { useParams, useNavigate} from 'react-router-dom'

import { read, update } from '../functions/product'

// loyout
import { Box, TextField, Button } from '@mui/material'

const FormEditProduct = () => {
    const params = useParams()
    const navigate = useNavigate()

    // console.log(params.id)
    const [data, setData] = useState({
      name:'',
      detail:'',
      price:''
    })

    const [fileold, setFileOld] = useState()

    useEffect(()=>{
      loadData(params.id)
    },[])

    const loadData = async (id) =>{
      read(id)
      .then((res)=>{
        setData(res.data)
        setFileOld(res.data.file)
      })
    }

      // Function ດັກຈັບທຸກໆເຫດການ ກໍລະນີປ້ອນຂໍ້ມູນເຂົ້າຟອມ
  const handleChange = (e) => {
    //console.log(e.target.name,e.target.value)
    if (e.target.name === 'file'){
      setData({
        ...data,
        [e.target.name]: e.target.files[0]
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value
      });
    }
  };

// ຍ້າຍຄຳສັງໄປເກັບໄວ້ຢູ່ໂຟເດີ້ function>product
  // save to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formWithImageData = new FormData()
    for ( const key in data){
      formWithImageData.append(key, data[key])
    }
    formWithImageData.append('fileold', fileold)
    update(params.id, formWithImageData)  
    .then((res) => {
        console.log(res);
        navigate('/admin/viewtable')
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>FormEditProduct

    <form onSubmit={handleSubmit} encType="multipart/form-data">
    <div> 
        <TextField 
        id="outlined-basic" 
        label="name" 
        name="name"
        value={data.name}
        onChange={(e) => handleChange(e)}
        variant="outlined" 
        />
      </div>
      <div>
        <TextField 
        id="outlined-basic" 
        label="detail" 
        name="detail"
        value={data.detail}
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
        value={data.price}
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
    </div>

  )
}

export default FormEditProduct