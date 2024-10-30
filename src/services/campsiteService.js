import axios from './interceptors'

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/campsites`

// ? Create
export function create(formData) {
    return axios.post(BASE_URL, formData)
}
// ? Index
export function index() {
    return axios.get(BASE_URL)
}
// ? Show
export function show(campsiteId) {
    return axios.get(`${BASE_URL}/${campsiteId}`)
}
// ? Update
export function update(campsiteId, formData) {
    return axios.put(`${BASE_URL}/${campsiteId}`, formData)
}
// ? Delete
export function deleteCampsite(campsiteId) {
    return axios.delete(`${BASE_URL}/${campsiteId}`)
}