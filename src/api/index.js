import axios from 'axios';
const instance = axios.create({ baseURL: 'https://growloc-backend.herokuapp.com/api/' });
export default instance