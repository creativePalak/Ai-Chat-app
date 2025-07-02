import { io } from "socket.io-client";

const Api = import.meta.env.VITE_SOCKET_API

const socket = io( Api , {
    autoConnect : false
 });

 socket.on('connect' , () => {
    console.log('socket connected')
 })


export default socket