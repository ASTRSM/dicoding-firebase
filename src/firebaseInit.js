import firebase from 'firebase/compat/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDK-avGxZBRS0l3T9bCTeHz4lIlJRidkEQ',
  authDomain: 'fir-login-aad66.firebaseapp.com',
  databaseURL:
    'https://fir-login-aad66-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'fir-login-aad66',
  storageBucket: 'fir-login-aad66.appspot.com',
  messagingSenderId: '1021711336851',
  appId: '1:1021711336851:web:16cbe5dd0353114dde1466',
  measurementId: 'G-94BS1F5GMZ'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)