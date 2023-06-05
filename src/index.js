import './styles.css'
import 'firebaseui/dist/firebaseui.css'
import './firebaseInit'
import startUi from './firebaseUI'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const path = window.location.pathname.split('/')[0]
console.log(path)

const auth = getAuth()

clearScreen()

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    clearScreen()
    showProfile(user)
  } else {
    // User is signed out
    clearScreen()
    startUi() 
  }
})

function clearScreen() {
  document.querySelector('#app').innerHTML = ''
}

function showProfile(user) {
  const App = document.querySelector('#app')

  App.insertAdjacentHTML('beforeend', /*html*/`
      <div class="mt-60 flex items-center justify-center flex-col">
        <img src="${user.photoURL}" alt="profile" class='rounded-full w-30 h-30 mb-2' onerror="this.src='https://ui-avatars.com/api/?name=${user.displayName}'">
        <h1 class='font-semibold'>${user.displayName}</h1>
        <p class='mb-6'>${user.email}</p>
        <button id="logout" class='rounded-full bg-rose-500 text-white py-2 px-6 font-normal tracking-wide hover:opacity-50 transition-opacity'>LOGOUT</button>
      </div>
    `
  )

  document.querySelector('#logout').addEventListener('click', () => {
    clearScreen()
    auth.signOut()
  })
}

