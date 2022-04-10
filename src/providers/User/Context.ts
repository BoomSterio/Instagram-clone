import React from 'react'
import { UserContextType } from './Provider'

const defaultValue: UserContextType = {
  userAuth: null,
  userInfo: null,
}

export const Context = React.createContext<UserContextType>(defaultValue)

export default Context
