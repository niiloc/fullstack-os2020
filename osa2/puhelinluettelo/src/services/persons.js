import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = deleteObject => {
    const request = axios.delete(`${baseUrl}/${deleteObject}`)
    return request.then(response => response.data)
}

const updateNumber = updateObject => {
    const request = axios.put(`${baseUrl}/${updateObject.id}`, updateObject)
    return request.then(response => response.data)
}

export default { getAll, create, deletePerson, updateNumber}