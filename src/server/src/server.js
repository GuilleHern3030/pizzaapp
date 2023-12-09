const express = require('express') // framework
const router = require('./routes') // routes
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

const { PORT } = require('./config')

const server = express()

// middlewares
server.use(morgan('dev'))
server.use(express.static(path.join(__dirname, '..', 'public')));
server.use(express.urlencoded({extended:false}))
server.use(express.json())
server.use(cors())
server.use(router)

// settings
server.set('port', PORT) // variable port
server.set('json spaces', 2) // 2 espacios en json

// default route
server.get('/', (request, response) => {
    const fechaHoraActual = new Date();
    console.log("rawHeaders:", request.rawHeaders)
    console.log("url:", request.url)
    console.log("method:", request.method)
    console.log("httpVersion:", request.httpVersion)
    console.log("complete:", request.complete)
    console.log("status:", request.statusCode)
    console.log("status:", request.statusMessage)
    console.log("query:", request.query)
    console.log("params", request.params)
    console.log("body", request.body)
    //response.send(`<h1>Hola mundo ${fechaHoraActual}</h1>`)
    response.sendFile(path.join(__dirname, '../public', 'index.html'));
    response.end()
})

module.exports = server;