import axios from 'axios'

// components>formProduct
// handleRemove
export const remove = async(id)=>
    await axios.delete(process.env.REACT_APP_API + '/product/' + id)

// handleSubmit
export const create = async (data) =>
    await axios.post(process.env.REACT_APP_API + '/product', data)

// loadData
export const getdata = async () => {
    // console.log(data)
    return await axios.get(process.env.REACT_APP_API + '/product')
}

export const read = async (id) => {
    // console.log(data)
    return await axios.get(process.env.REACT_APP_API + '/product/' + id)
}

export const update = async (id, data) => {
    // console.log(data)
    return await axios.put(process.env.REACT_APP_API + '/product/' + id, data)
}