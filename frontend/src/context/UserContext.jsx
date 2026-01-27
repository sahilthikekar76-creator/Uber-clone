import React, { createContext } from 'react'

export const UserDataContext=createContext();
const userContext = ({children}) => {
  return (
    <div>
        <UserDataContext.Provider>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default userContext
