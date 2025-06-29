import { createContext, useState , useContext } from "react";

export const User = createContext({})

export const useUser = () => {
    const context = useContext(User)
    return context
}

export const UserProvider = ({children}) => {
    const [username , setUsername] = useState('')
    const [isLogin , setLogin ] = useState(false)
    return (
        <User.Provider value={{username,setUsername , isLogin , setLogin}} >
            {children}
        </User.Provider>
    )
} 