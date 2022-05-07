// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import {
  GithubAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
  getModularInstance,
} from "firebase/auth"
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  getDocs,
  getDoc,
} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEKN-Ffpz3i_fCEF-kwiNPUfmpoiMuRuE",
  authDomain: "devter-d92a4.firebaseapp.com",
  projectId: "devter-d92a4",
  storageBucket: "devter-d92a4.appspot.com",
  messagingSenderId: "78211422390",
  appId: "1:78211422390:web:b059f1483f54ef06cb2e17",
  measurementId: "G-10ERWZW90J",
}

// Initialize Firebase
// getApps().length === 0 && initializeApp(firebaseConfig)

// const app = getApp()
const app = initializeApp(firebaseConfig)
const authApp = getAuth(app)
const db = getFirestore(app)

function mapUserFromFirebaseAuthTo(user) {
  console.log(user)
  const { photoURL, displayName, email, uid } = user
  return { photo: photoURL, username: displayName, email, uid }
}

export function handleOnAuthStateChanged(onChange) {
  return onAuthStateChanged(authApp, (user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthTo(user) : null
    onChange(normalizedUser)
  })
}

export default function loginWithGithub() {
  const githubProvider = new GithubAuthProvider()
  return signInWithPopup(authApp, githubProvider)
    .then(mapUserFromFirebaseAuthTo)
    .catch((error) => console.error(error))
}

export const addDevit = ({ avatar, userId, userName, content }) => {
  const devitsCollection = collection(db, "devits")
  return addDoc(devitsCollection, {
    avatar,
    content,
    userId,
    userName,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatestDevits = () => {
  const devitsCollection = collection(db, "devits")
  return getDocs(devitsCollection)
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const intl = new Intl.DateTimeFormat("es-ES")
        const normalizedCreatedAt = intl.format(
          new Date(data.createdAt.seconds * 1000)
        )
        return {
          ...data,
          id,
          createdAt: normalizedCreatedAt,
        }
      })
    })
    .catch((error) => error)
}
