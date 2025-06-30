import React, { useEffect, useState, useRef } from 'react';
import Chat from './Chat';
import socket from '../socket/socket'


function Random() {
  const input = useRef(null);
  const [roomID, setRoomID] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socketID , setSocketID ] = useState(null)

  const sendMsg = () => {
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

    // Set socket ID after connection is established
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

   
  }, []);

  return (
    <div>
      <Chat
        InputRef={input}
        onClick={sendMsg}
        messages={messages}
        socketID={socketID}
      />
    </div>
  );
}

export default Random;
