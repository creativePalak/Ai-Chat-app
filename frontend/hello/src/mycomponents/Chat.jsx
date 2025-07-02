import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import { InputAnimation , ButtonAnimation } from './Animation'

function Chat ( { messages , onClick , InputRef , socketID , roomID , randomChat=false} ) {
  
  console.log('Current socketId:', socketID);
  console.log('Messages:', messages);

  return (
    <div className='min-h-screen bg-background dark text-white  flex flex-col px-5 lg:px-20 py-10'> 
        <div className='text-4xl text-center ' >
            { randomChat ?  `Welcome to the Anonymous Chatroom` :  `Welcome to Chatroom`   }
        </div>
        <div className='flex-1 overflow-y-auto'>
            {
                !roomID ? (
                    <div className='text-4xl text-center my-24' > You are in queue </div>
                ) : (
                    messages &&
                    messages.map((msg, index) => {
                        console.log(`Message ${index}: sender="${ randomChat ? 'Anonymous' : msg.username }", socketId="${socketID}", match=${msg.sender === socketID}`);
                        return (
                            <div key={index} className={`${msg.sender === socketID ? 'text-right' : 'text-left'}  my-4`} >
                                <div className='text-xs text-gray-400 my-2 '>
                                    {msg.sender === socketID ? 'You' : `${ randomChat ? 'Anonymous' : msg.username }`  }
                                </div>
                                <span className={`${msg.sender === socketID ? 'bg-blue-500' : 'bg-gray-500'} text-white px-4 py-2 rounded-lg`}>
                                    {msg.message}
                                </span>
                            </div>  
                        )
                    })
                )
            }
           
        </div>
        <div className='mt-auto p-4  border-neutral-700' >
                <form onSubmit={onClick} className='flex gap-3' >
                <motion.div {...InputAnimation} className='flex-1' >
                    <Input className='flex-1' ref={InputRef}   placeholder='Type your message...' />
                </motion.div>
                <motion.div {...ButtonAnimation} >
                    <Button className={`hover:cursor-pointer`} >Send</Button>
                </motion.div>
                </form>
        </div>
    </div>
  )
}

export default Chat