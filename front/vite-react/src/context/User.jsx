import { createContext, useState } from "react";

export const UserDataContext = createContext({
    userData: { user, userAppointments: [] },
    setUserData:()=>{}
})

export const UserDataProvider = ({children}) => {
    const [userData, setUserData] = useState({
        user: {userName:null, password:null},
        userAppointments: [],
    });

    const value={
        userData,
        setUserData
    }

    return (
        <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>
    )
}