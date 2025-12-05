import axios from 'axios'

const baseUrl= '/api/persons'
let token =null
const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const requestServer = axios.get(baseUrl)
    return requestServer.then(response =>response.data)
}

const create = (newObject) => {
    const config = {
        headers: {Authorization:token}
    }
    const requestServer = axios.post(baseUrl, newObject, config)
    return requestServer.then(response =>response.data)
}
const update = (id, updateNote) => {
    const requestServer = axios.put(`${baseUrl}/${id}`, updateNote)
    return requestServer.then(response =>response.data)
}

const deletePerson= (id)=> {
    const requestServer = axios.delete(`${baseUrl}/${id}`)
    return requestServer.then(response =>response.data)
}

// const handlePurchase = async (id) => {
//       const res = await axios.post(
//         `http://localhost:3000/payments/create/${id}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
 
//       const url = res.data.checkout_url;
 
//       // Redirect user to VismaPay
//       window.location.href = url;
 
//   };





export default {getAll, create, update, deletePerson, setToken, handlePurchase}