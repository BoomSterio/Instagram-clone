import { useState, FunctionComponent, useEffect } from 'react'

import Context from './Context'
import { auth, db } from 'config'
import { User, UserAuth } from 'types'

export interface UserContextType {
  userAuth: UserAuth
  userInfo: User | null
}

interface UserData extends User {
  userId: string
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
          const data: UserData = snapshot.data() as UserData
          if (!data) {
            return
          }

          const userData: User = {
            ...data,
            id: data.userId,
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
