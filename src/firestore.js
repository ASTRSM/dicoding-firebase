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