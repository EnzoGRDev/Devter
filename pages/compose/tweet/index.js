import AppLayout from "../../../components/AppLayout"
import Button from "../../../components/Button"
import useUser, { COMPOSE_STATES } from "../../../hooks/useUser"
import { useState } from "react"
import { addDevit } from "../../../firebaseConfig/client"
import { useRouter } from "next/dist/client/router"

export default function ComposeTweet() {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const user = useUser()
  const router = useRouter()

  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.photo,
      content: message,
      userName: user.username,
      userId: user.uid,
    })
      .then(() => router.push("/home"))
      .catch((error) => {
        console.error(error)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Que esta pasando?"
            value={message}
            onChange={handleChange}
          />
          <Button disabled={isButtonDisabled}>Devitear</Button>
        </form>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }
        textarea {
          border: 0;
          font-size: 21px;
          min-height: 200px;
          padding: 15px;
          outline: 0;
          resize: none;
          width: 100%;
        }
      `}</style>
    </>
  )
}
