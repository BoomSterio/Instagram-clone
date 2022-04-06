import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC3Gr7j6c18jg6vG2YDgEBfUUROikPaUKA',
  authDomain: 'instagram-rn-b2fe3.firebaseapp.com',
  projectId: 'instagram-rn-b2fe3',
  storageBucket: 'instagram-rn-b2fe3.appspot.com',
  messagingSenderId: '436349719697',
  appId: '1:436349719697:web:7330c4a0698564b19adb30',
  measurementId: 'G-Y0MXPSPVYB',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const db = firebase.firestore()

export {auth, db}
