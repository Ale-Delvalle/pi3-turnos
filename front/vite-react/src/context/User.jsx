import { createContext, useState } from "react";

export const UserDataContext = createContext({
    user: null,
    setUser: () => {},
    userAppointments: [],
    setUserAppointments: () => {},
    isLoggedIn:false,
    setIsLoggedIn: () => {}
})

export const UserDataProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [userAppointments, setUserAppointments] = useState([])
    const [isLoggedIn,setIsLoggedIn]=useState(false)

    const value={
        user,
        setUser,
        userAppointments,
        setUserAppointments,
        isLoggedIn,
        setIsLoggedIn
    }

    return (
        <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>
    )
}