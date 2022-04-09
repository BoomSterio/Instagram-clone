import { SignedInStack, SignedOutStack } from 'providers/Navigation/Navigation'
import { useEffect, useState } from 'react'
import { auth } from '../../../firebase'
import firebase from 'firebase/compat/app'

export const Auth = () => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)

  const userHandler = (user: firebase.User | null) => {
    if (user) {
      setCurrentUser(user)
      return
    }
    setCurrentUser(null)
  }

  useEffect(() =>
    auth.onAuthStateChanged((user: firebase.User | null) => userHandler(user))
  , [])

  return currentUser ? <SignedInStack /> : <SignedOutStack />
}