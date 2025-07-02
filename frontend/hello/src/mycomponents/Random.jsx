import React, { useEffect, useState, useRef } from 'react';
import Chat from './Chat';
import socket from '../socket/socket'
import { useLocation } from 'react-router-dom';

function Random() {
  const input = useRef(null);
  const [roomID, setRoomID] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socketID , setSocketID ] = useState(null)
  const location = useLocation()
  
  const sendMsg = (e) => {
    e.preventDefault()
    if (roomID) {
      const message = input.current.value
      if (message) {
        socket.emit('random:message', { roomID , message });
        input.current.value = '';
      }
    } else {
      alert('No room is connected');
    }
  };

  useEffect(() => {

    if (!socket.connected) {
      socket.connect();
    }

    socket.on('connect', () => {
      setSocketID(socket.id);
      console.log('Socket connected with ID:', socket.id);
    });

    socket.emit('random:chat');

    socket.on('room-assigned', ({ roomId }) => {
      setRoomID(roomId);
    });

    socket.on('room:message', (payload) => {
      console.log(payload)
      setMessages((prev) => [...prev, payload]);
      console.log(messages)
    });

    socket.on('disconnect' , () => {
      setRoomID(false)
    } )

    socket.on('on:disconnect' , (e) =>{
      setMessages([])
      setRoomID(false)
    })

    return () => {
      socket.disconnect()
      socket.off('connect')
      socket.off('room-assigned')
      socket.off('room:message')
      socket.off('disconnect')
      socket.off('on:disconnect')
    }
    
  }, [location.pathname]);

  return (
    <div>
      <Chat
        roomID={roomID}
        InputRef={input}
        onClick={sendMsg}
        messages={messages}
        socketID={socketID}
        randomChat={true}
      />
    </div>
  );
}

export default Random;
