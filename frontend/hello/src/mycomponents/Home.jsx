import React from 'react'
import MyCard from './MyCard'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/store/User'

function Home() {
    const Navigate = useNavigate()
    const { username } = useUser()
    console.log('username => ' , username)

    const Options = [
        {
            id : 1,
            title : ' Join Random',
            description : 'Join random people who are searching for random ppl in this site',
            Active : 'I dont know',
            onClick : () => { Navigate('/random') }
        } ,
        {
            id : 2,
            title : ' Custom Room ',
            description : 'Create custom room and chat with your friends',
            Active : 'I dont know',
            onClick : () => { Navigate('/room') }
        } ,
        {
            id : 3 ,
            title : ' Personal Message',
            description : 'Message you friend and chat with each other ',
            Active : 'I dont know',
            onClick : () => { Navigate('/dm') }
        } 
    ]


  return (
    <div className='bg-background dark min-h-screen px-24' >
        <div className='text-4xl text-gray-200 text-center py-10 ' >
            Hello , {username}
        </div>
        <div className=' flex gap-10 items-center justify-center my-10' >
        {
            Options.map( ( {id,title,description,Active,onClick} , index) => {
                return (
                    <MyCard key={id} title={title} Description={description} Active={Active} onClick={onClick}  />
                )
            } )
        }
        </div>
    </div>
  )
}

export default Home