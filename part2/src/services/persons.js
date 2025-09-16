import axios from 'axios'

const baseUrl= 'http://localhost:3001/persons'

const getAll = () => {
    const requestServer = axios.get(baseUrl)
    return requestServer.then(response =>response.data)
}

const create = (newObject) => {
    const requestServer = axios.post(baseUrl, newObject)
    return requestServer.then(response =>response.data)
}
const update = (id, updateNote) => {
    const requestServer = axios.post(`${baseUrl}/${id}`, updateNote)
    return requestServer.then(response =>response.data)
}

const deletePerson= (id)=> {
    const requestServer = axios.delete(`${baseUrl}/${id}`)
    return requestServer.then(response =>response.data)
}


export default {getAll, create, update, deletePerson}