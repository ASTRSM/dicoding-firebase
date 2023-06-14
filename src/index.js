import './styles.css'
import 'firebaseui/dist/firebaseui.css'
import './firebaseInit'
import startUi from './firebaseUI'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getPrivatePosts, getPublicPosts } from './firestore'
import PostCard from './components/PostCard'
import db from './firestore'

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

async function showProfile(user) {
  const App = document.querySelector('#app')
  const privatePosts = await getPrivatePosts(db, user.uid)
  const publicPosts = await getPublicPosts(db)


  App.insertAdjacentHTML(
    'beforeend', /*html*/ `
      <div class="mt-10 flex items-center flex-col" id="profile">
        <img src="${user.photoURL}" alt="profile" class='rounded-full w-30 h-30 mb-2' onerror="this.src='https://ui-avatars.com/api/?name=${user.displayName}'">
        <h1 class='font-semibold'>${user.displayName}</h1>
        <p class='mb-6'>${user.email}</p>
        <button id="logout" class='rounded-full bg-rose-500 text-white py-2 px-6 font-normal tracking-wide hover:opacity-50 transition-opacity'>LOGOUT</button>
      </div>
      <div class="mt-10 flex items-center justify-center gap-16" id="post-container">
        <div id="private">
          <h1 class='font-light text-2xl mb-6 text-center'>Private Posts</h1>
        </div>
        <div id="public">
          <h1 class='font-light text-2xl mb-6 text-center'>Public Posts</h1>
        </div>
      </div>
    `
  )

  const privateContainer = document.querySelector('#private')
  const publicContainer = document.querySelector('#public')

  privatePosts.forEach((post) => {
    PostCard(post, privateContainer, true)
  })

  publicPosts.forEach((post) => {
    PostCard(post, publicContainer)
  })

  document.querySelector('#logout').addEventListener('click', () => {
    clearScreen()
    auth.signOut()
  })
}

