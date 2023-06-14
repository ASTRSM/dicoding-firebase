> Expected Output
```js
[
    {
	    "author": "user1",
        "body": "lorem impsum",
        "public": true,
        "timestamp": 1686582948,
        "title": "Contoh Judul",
        "userId": "5oVivXszEOaQXPB7Mb02nbQrKB33"
    }
]
```

#### 1. Create Firestore Database on Firebase Console
[Start Guide](https://firebase.google.com/docs/firestore/quickstart)
##### 1.1 [Rules](https://firebase.google.com/docs/firestore/quickstart#secure_your_data)
```js
// Allow read/write access on all documents to any user signed in to the application
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
#### 2. Initialize Firestore
```js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
...
const firebaseConfig = {/* Your Firebase Config */}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

```
#### 3. Read Data
[Firestore get/read data docs](https://firebase.google.com/docs/firestore/query-data/get-data)
##### 3.1 getPublicPosts
```js
export const getPublicPosts = async (db) => {
  const publicPostQuery = query(
    collection(db, 'post'),
    where('public', '==', true)
  )

  const publicPostSnapshot = await getDocs(publicPostQuery)
  const publicPostList = publicPostSnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id }
  })

  return publicPostList
}
```

##### 3.2 getPrivatePosts
[Firestore query](https://firebase.google.com/docs/firestore/query-data/queries)
```js
export const getPrivatePosts = async (db, uid) => {
  const privatePostQuery = query(
    collection(db, 'post'),
    where('userId', '==', uid)
  )

  const privatePostSnapshot = await getDocs(privatePostQuery)
  const privatePostList = privatePostSnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id }
  })

  return privatePostList
}
```
#### 4. Create new Firestore file (optional)
##### 4.1 Export FirebaseInit app
```js
// Initialize Firebase
export default initializeApp(firebaseConfig)
```
#### Create Firestore initialization
>Root -> src -> firestore.js
```js
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where
} from 'firebase/firestore'
import app from './firebaseInit'

// Initialize Cloud Firestore and get a reference to the service
export default getFirestore(app)

export const getPublicPosts = async (db) => {
  const publicPostQuery = query(
    collection(db, 'post'),
    where('public', '==', true)
  )

  const publicPostSnapshot = await getDocs(publicPostQuery)
  const publicPostList = publicPostSnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id }
  })

  return publicPostList
}

export const getPrivatePosts = async (db, uid) => {
  const privatePostQuery = query(
    collection(db, 'post'),
    where('userId', '==', uid)
  )

  const privatePostSnapshot = await getDocs(privatePostQuery)
  const privatePostList = privatePostSnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id }
  })

  return privatePostList
}
```
#### 5. Data to UI
##### 5.1 Create card components for post
>src -> components -> PostCard.js
```js
export default function PostCard(post, Container, showButton = false) {
  const toDate = post.timestamp.toDate().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const buttons = /*html*/ `
  <div class="flex items-center gap-4">
    <button class='rounded-md bg-amber-400 text-white py-1 px-6 font-bold tracking-wide hover:opacity-50 transition-opacity'>EDIT</button>
    <button class='rounded-md bg-rose-500 text-white py-1 px-6 font-bold tracking-wide hover:opacity-50 transition-opacity'>DELETE</button>
  </div>
  `

  Container.insertAdjacentHTML(
    'beforeend', /*html*/`
      <div class="mt-6 flex flex-col w-[500px] shadow-lg rounded-lg p-6 min-h-[185px]" id="${post.id}">
        <div class="flex items-center justify-between">
          <p class='font-extralight'>${post.author}</p>
          <p class="font-light">${toDate}</p>
        </div>
        <h1 class='font-semibold text-2xl'>${post.title}</h1>
        <p class='mb-6'>${post.body}</p>
        <div class="flex items-center justify-between">
          <p class='font-bold'>${post.public ? 'Public' : 'Private'}</p>
          ${showButton ? buttons : ''}
        </div>
      </div>
    `
  )
}
```
##### 5.2 Update index.js showProfile()
```js
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
```
