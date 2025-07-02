import React, { useState } from 'react'
import MyCard from './MyCard'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/store/User'
import Popup from './Popup'
import { useEffect } from 'react'
import socket from '@/socket/socket'
import { useLocation } from 'react-router-dom'

function Home() {
    const Navigate = useNavigate()
    const { username } = useUser()
    const [open, setOpen] = useState(false)
    const [waitingRandom , setWaitingRandom] = useState(0)
    const [roomCount , setRoomCount] = useState(0)
    const location = useLocation()

    const Options = [
        {
            id: 1,
            title: ' Join Random',
            description: 'Join random people who are searching for random ppl in this site',
            Active: `Waiting Users : ${waitingRandom}`,
            onClick: () => { Navigate('/random') }
        },
        {
            id: 2,
            title: ' Custom Room ',
            description: 'Create custom room and chat with your friends',
            Active: `create room now    `,
            onClick: () => { setOpen(true) }
        },
    ]

    useEffect(() => {
        socket.emit('waiting:users')
        socket.emit('total:room')

        if (!socket.connected) {
            socket.connect()
        }

        socket.on('random:waiting', (length) => {
            setWaitingRandom(length)
            console.log('Waiting users : ', length)
        } )


        return () => {
            socket.disconnect()
            socket.off('random:waiting')
            socket.off('waiting:users')
            setWaitingRandom(0)
            setRoomCount(0)
        }
    } ,[location.pathname])


    return (
        <>
        <div className='bg-background dark min-h-screen px-24' >
            <div className='text-4xl text-gray-200 text-center py-10 ' >
                Hello , {username}
            </div> 
            <Popup open={open} setOpen={setOpen} />
            <div className=' flex lg:flex-row flex-col gap-10 items-center justify-center my-10' >
                {
                    Options.map(({ id, title, description, Active, onClick }, index) => {
                        return (
                            <MyCard key={id} title={title} Description={description} Active={Active} onClick={onClick} />
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}

export default Home