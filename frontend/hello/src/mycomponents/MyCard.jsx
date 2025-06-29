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

function MyCard ( {onClick,title,Description,Active} ) {
    return (
        <div className='w-78' >
            <Card >
                <CardHeader>
                    <CardTitle className={`text-xl`} > {title} </CardTitle>
                    <CardDescription>{Description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{Active}</p>
                </CardContent>
                <div className='flex justify-center items-center' >
                <Button onClick={onClick} className={`w-fit `} >
                    Join
                </Button>
                </div>
            </Card>
        </div>
    )
}

export default MyCard