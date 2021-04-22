require('dotenv/config')
const axios = require('axios')

const api = axios.create({
    baseURL: 'https://gidoquiz-backend.herokuapp.com/'
})

module.exports = api
