import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'

function Chat ( { messages , onClick , InputRef , socketID } ) {
  
  console.log('Current socketId:', socketID);
  console.log('Messages:', messages);

  return (
    <div className='min-h-screen bg-background dark text-white  flex flex-col px-20 py-10'> 
        <div className='text-4xl text-center ' >
            Welcome to the Anonymous Chatroom
        </div>
        <div className='flex-1 overflow-y-auto'>
            {
                messages && 
                messages.map( (msg , index) => {
                    console.log(`Message ${index}: sender="${msg.sender}", socketId="${socketID}", match=${msg.sender === socketID}`);
                    return (
                        <div key={index} className={`${ msg.sender === socketID ? 'text-right' : 'text-left' }  my-4`} >
                                <span className={`${ msg.sender === socketID ? 'bg-blue-500' : 'bg-gray-500'} text-white px-4 py-2 rounded-lg`}>
                                    {msg.message}
                                </span>
                            </div>
                    )
                })
            }
            {/* { messages &&
                messages.map( (msg, index) => {
                        if (msg.sender === 'you') {
                        return (<div key={index} className='my-4 text-right' >
                                <span className='bg-blue-500 text-white px-4 py-2 rounded-lg' >
                                    {msg.messg}
                                </span>
                            </div>)
                        } else {
                        return   (<div key={index} className='my-4 text-left' >
                                <span className='bg-gray-500 text-white px-4 py-2 rounded-lg' >
                                    {msg.messg}
                                </span>
                            </div>)
                        }
                } )
            } */}
        </div>
        <div className='mt-auto p-4  border-neutral-700' >
            <div className='flex gap-3' >
                <Input className='flex-1' ref={InputRef}   placeholder='Type your message...'></Input>
                <Button onClick={onClick}>Send</Button>
            </div>
        </div>
    </div>
  )
}

export default Chat