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
getApps().length === 0 && initializeApp(firebaseConfig)
const app = getApp()
const authApp = getAuth(app)

function mapUserFromFirebaseAuthTo({ _tokenResponse, reloadUserInfo }) {
  console.log(_tokenResponse, reloadUserInfo)

  const { photoUrl, screenName } = _tokenResponse || reloadUserInfo
  return { photo: photoUrl, username: screenName }
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
