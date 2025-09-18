import axios from "axios"

const baseUrl = 'https://open.er-api.com/v6/latest'


const getAll = (currency)=>{
    const request= axios.get(`${baseUrl}/${currency}`)
    return  request.then(response => (response.data.rates))
}


export default {getAll}
        
    