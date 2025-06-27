import { useEffect } from 'react'
import { useState } from 'react'
import io from 'socket.io-client'
import { Button } from '@/components/ui/button'
const socket = io('http://localhost:3000')


function Chat() {

    const [message, setMessage] = useState('')

    const sendMessage = () => {
        socket.emit('message', { message: message })
        setMessage('')
    }

    const [messages, setMessages] = useState([])
    const [name, setName] = useState(null)

    useEffect(() => {
        socket.on('recieve_message', (payload) => {
            setMessages((prev) => [...prev, payload])
        })

        return () => {
            socket.off('recieve_message')
        }

    }, [])


    return (
        <>
            <div className=' p-24 bg-neutral-900 text-white flex-col flex justify-center gap-10 items-center min-h-screen ' >
                <div className='text-center text-4xl' >
                    ANONYMOUS CHAT APP
                </div>
                <div className='flex gap-5'>
                    <input type="text" className='bg-neutral-700 h-10 rounded focus:border-0 p-2' value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button onClick={sendMessage} >
                        submit
                    </Button>
                </div>
                <div className='my-10' >
                    {
                        messages.map((msg, index) => (
                            <div key={index} className='bg-neutral-800 text-white p-2 rounded-lg my-2' >
                                {msg.message}
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Chat
