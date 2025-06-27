const express = require('express')
const {createServer} = require('node:http')
const {Server} = require('socket.io')

const app =  express()
const server = createServer(app)
const port = 3000

const io = new Server(server , {
    cors : {
        origin : 'http://localhost:5173',
        methods : ['GET','POST'],
    }
})                                                                                                                                          

app.get('/',(req,res)=>{
    res.json({res:"helloworld"})
})

io.on('connection' , (socket) => {
    console.log(`user is connected and socket is ${socket.id}`)
    socket.on('message',(payload) => {
        console.log(payload)
        io.emit('recieve_message',payload);
    })
})

server.listen(port, () => {
    console.log(`Server is running at the port ${port}`)
})