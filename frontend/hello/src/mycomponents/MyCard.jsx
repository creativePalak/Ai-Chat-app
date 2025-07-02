import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { ButtonAnimation } from './Animation'
import { motion } from "motion/react"


function MyCard ( {onClick,title,Description,Active} ) {
    return (
        <motion.div 
        className='w-78'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
            <Card >
                <CardHeader>
                    <CardTitle className={`text-xl`} > {title} </CardTitle>
                    <CardDescription>{Description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{Active}</p>
                </CardContent>
                <div className='flex justify-center items-center' >
                <motion.div {...ButtonAnimation} >
                <Button onClick={onClick} className={`w-fit hover:cursor-pointer`} >
                    Join
                </Button>
                </motion.div>
                </div>
            </Card>
        </motion.div>
    )
}

export default MyCard