import firebase from 'firebase/compat/app'

export interface User {
  id: string
  username: string
  profilePicture: string
  email: string
  name?: string
  bio?: string
  phoneNumber?: string
}

export type UserAuth = firebase.User | null
