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
let pairMap = new Map()
let roomMap = new Map()


io.on('connection' , (socket) => {
    console.log(`user is connected and socket is ${socket.id}`)


    socket.on('custom:chat' , ({ roomID }) => {
        socket.join(roomID)
        console.log(`${socket.id}  joined the room ${roomID}`)
    } )

    socket.on('custom:message' , ({ roomID , message , username }) => {
        
        io.to(roomID).emit('room:message' ,{
            username : username,
            sender : socket.id,
            message : message,
            roomID : roomID,
        })
        console.log('Message : ')
        console.log({
            sender : socket.id,
            message : message,
            roomID : roomID
        })
    } )



    socket.on('random:chat',(payload) => {

        
        randomQueue.push(socket)
        console.log('sockets : ' , randomQueue.length)
        const length = randomQueue.length
        io.emit('random:waiting' , length)
        if ( randomQueue.length >= 2  ) {
            let socket1 = randomQueue[0]
            let socket2 = randomQueue[1]
            const roomId = `${socket1.id}#${socket2.id}`
            randomQueue.splice(0,2)
            const length = randomQueue.length
            io.emit('random:waiting' , length)
            socket1.join(roomId)
            socket2.join(roomId)
            pairMap.set(socket1.id , socket2 )
            pairMap.set(socket2.id , socket1 )
            roomMap.set(socket1.id , roomId)
            roomMap.set(socket2.id , roomId)
            console.log(`2 sockets are connected here `)
            socket1.emit('room-assigned' , { message : 'joined the room'  , roomId : roomId , status : true} )
            socket2.emit('room-assigned' , { message : 'joined the room'  , roomId : roomId , status : true} )
        }
    })

    socket.on('random:message', ( { roomID , message } ) => {
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

    socket.on('disconnect' , () => {
        const disconnectedID = socket.id
        const otherUser = pairMap.get(socket.id)
        const isStillConnected = io.sockets.sockets.has(otherUser?.id)

        console.log(`user ${disconnectedID} is disconnected`)
        randomQueue = randomQueue.filter((s) => s.id !== disconnectedID);
        
        
        

        if (otherUser && isStillConnected) {
        otherUser.emit('on:disconnect', { message: 'Your partner has disconnected.' });
        
        const roomID = roomMap.get(otherUser.id)
        otherUser.leave(roomID)

        randomQueue.push(otherUser); // Optional: Re-queue them
        console.log(`Sent user ${otherUser.id} back to the queue`);
        console.log(`sending user ${otherUser.id} to queue again`)

    }
    
            pairMap.delete(disconnectedID)
            roomMap.delete(disconnectedID)
            if (otherUser) pairMap.delete(otherUser.id)
            if (otherUser) roomMap.delete(otherUser.id)

            const length = randomQueue.length
            io.emit('random:waiting' , length)

    } )

    socket.on('waiting:users' , () => {
        const length = randomQueue.length
        io.emit('random:waiting' , length)
    })

})



server.listen(port, () => {
    console.log(`Server is running at the port ${port}`)
})