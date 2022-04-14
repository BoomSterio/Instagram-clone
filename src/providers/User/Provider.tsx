import React, { useState, FunctionComponent, useEffect } from 'react'

import Context from './Context'
import { auth, db } from 'config'
import { User, UserAuth } from 'types'

export interface UserContextType {
  userAuth: UserAuth
  userInfo: User | null
}

const Provider: FunctionComponent = ({ children }) => {
  const [userAuth, setUserAuth] = useState<UserAuth>(null)
  const [userInfo, setUserInfo] = useState<User | null>(null)

  const userHandler = (user: UserAuth) => {
    if (user) {
      setUserAuth(user)
      return db
      .collection('users')
      .doc(user.uid)
      .onSnapshot((snapshot) => {
        const data = snapshot.data()
        if (!data) {
          return
        }

        const userData: User = {
          id: data.userId,
          username: data.username,
          profilePicture: data.profilePicture,
        }
        setUserInfo(userData)
      })
    }
    setUserAuth(null)
  }

  useEffect(() => {
    auth.onAuthStateChanged((user: UserAuth) => userHandler(user))
  }, [])

  return <Context.Provider value={{ userAuth, userInfo }}>{children}</Context.Provider>
}

export default Provider
