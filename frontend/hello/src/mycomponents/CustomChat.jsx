import React, { useEffect, useRef, useState } from 'react'
import Chat from './Chat'
import { useParams } from 'react-router-dom'
import socket from '@/socket/socket'
import { useUser } from '@/store/User'
import { useLocation } from 'react-router-dom'

function CustomChat() {
    const { roomID } = useParams()
    const  [messages , setMessages ] = useState([])
    const [socketID, setSocketID] = useState(null)
    const InputRef = useRef(null)
    const { username } = useUser()
    const location = useLocation()

    console.log(username, 'username in custom chat')
    const sendMsg = (e) => {
        e.preventDefault();
        if (!InputRef.current) {
            alert('Write something to send');
            return;
        };
        socket.emit('custom:message', { roomID, message: InputRef.current.value , username : username });
        InputRef.current.value = '';
    }

    useEffect(() => {
        if (!socket.connected){
            socket.connect()
        }

        socket.on('connect', () => {
            setSocketID(socket.id)
        })

        socket.emit('custom:chat',{roomID})

        socket.on('room:message', (payload) => {
            setMessages((prev) => [...prev, payload]);
        });

        socket.on('disconnect', () => {
            setMessages([]);
            setSocketID(null);
        });

        () => {
            socket.disconnect();
            socket.off('connect');
            socket.off('room:message');
            socket.off('custom:chat');
        }

    } ,[location.pathname])

  return (
    <div>
        <Chat
            roomID={roomID}
            messages={messages}
            InputRef={InputRef}
            randomChat={false}
            socketID={socketID}
            onClick={sendMsg}
        />
    </div>
  )
}

export default CustomChat