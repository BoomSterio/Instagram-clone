import React, { useState, FunctionComponent, useEffect } from 'react';

import Context from './Context';
import { auth } from '../../../firebase';
import firebase from 'firebase/compat/app'

export type User = firebase.User | null

const Provider: FunctionComponent = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(null)

  const userHandler = (user: User) => {
    if (user) {
      setCurrentUser(user)
      return
    }
    setCurrentUser(null)
  }

  useEffect(() =>
    auth.onAuthStateChanged((user: User) => userHandler(user))
  , [])

  return <Context.Provider value={currentUser}>{children}</Context.Provider>;
};

export default Provider;
