import { useRouter } from "next/dist/client/router"
import { useEffect, useState } from "react"
import { handleOnAuthStateChanged } from "../firebaseConfig/client"

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
}

export const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

export default function useUser() {
  const [user, setUser] = useState(undefined)
  const router = useRouter()

  useEffect(() => {
    handleOnAuthStateChanged(setUser)
  }, [])

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push("/")
  }, [user])

  return user
}
