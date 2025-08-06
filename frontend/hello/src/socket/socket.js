import { io } from "socket.io-client";

const Api = "http://localhost:3000/";

const socket = io( Api , {
    autoConnect : false
 });

 socket.on('connect' , () => {
    console.log('socket connected')
 })


export default socket