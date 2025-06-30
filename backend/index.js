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

let randomQueue = []

io.on('connection' , (socket) => {
    console.log(`user is connected and socket is ${socket.id}`)

    socket.on('random:chat',(payload) => {
        randomQueue.push(socket)
        console.log('sockets : ' , randomQueue.length)
        if ( randomQueue.length >= 2  ) {
            let socket1 = randomQueue[0]
            let socket2 = randomQueue[1]
            const roomId = `${socket1.id}#${socket2.id}`
            randomQueue.splice(0,2)
            socket1.join(roomId)
            socket2.join(roomId)
            console.log(`2 sockets are connected here `)
            socket1.emit('room-assigned' , { message : 'joined the room'  , roomId : roomId , status : true} )
            socket2.emit('room-assigned' , { message : 'joined the room'  , roomId : roomId , status : true} )
        }
    })

    socket.on('random:message', ({roomID , message }) => {
        io.to(roomID).emit('room:message' , {
            sender : socket.id , 
            message : message ,
            roomID : roomID
        })
        console.log({
            sender : socket.id,
            message : message , 
            roomID : roomID
        })
    } )

    socket.on('random:disconnect' , () => {
        console.log('User disconnect' , socket.id )
        randomQueue = randomQueue.filter( (e) => e.id !== socket.id  )
    } )

})



server.listen(port, () => {
    console.log(`Server is running at the port ${port}`)
})