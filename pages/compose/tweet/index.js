import AppLayout from "../../../components/AppLayout"
import Button from "../../../components/Button"
import useUser, { COMPOSE_STATES } from "../../../hooks/useUser"
import { useState, useEffect } from "react"
import { addDevit, uploadImage } from "../../../firebaseConfig/client"
import { useRouter } from "next/dist/client/router"
import { getDownloadURL } from "firebase/storage"
import Head from "next/head"
import Avatar from "../../../components/Avatar"

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    const onProgress = () => {}
    const onError = () => {}
    const onComplete = () => {
      console.log("complete")
      getDownloadURL(task.snapshot.ref).then(setImgURL)
    }
    if (task) {
      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])

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
      img: imgURL,
    })
      .then(() => router.push("/home"))
      .catch((error) => {
        console.error(error)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = e.dataTransfer.files[0]

    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <AppLayout>
        <Head>
          <title>Crear un Devit / Devter</title>
        </Head>
        <section className="form-container">
          {user && (
            <section className="avatar-container">
              <Avatar src={user.photo} />
            </section>
          )}
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Que esta pasando?"
              value={message}
              onChange={handleChange}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            />
            <Button disabled={isButtonDisabled}>Devitear</Button>
            {imgURL && (
              <section className="remove-img">
                <button onClick={() => setImgURL(null)}>x</button>
                <img src={imgURL} />
              </section>
            )}
          </form>
        </section>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }

        .avatar-container {
          padding-top: 20px;
          padding-left: 10px;
        }

        .remove-img {
          position: relative;
        }
        .form-container {
          align-items: flex-start;
          display: flex;
        }

        button {
          background: rgba(0, 0, 0, 0.3);
          border: 0;
          border-radius: 999px;
          color: #fff;
          font-size: 24px;
          width: 32px;
          height: 32px;
          top: 15px;
          position: absolute;
          right: 15px;
        }

        form {
          padding: 10px;
        }

        img {
          border-radius: 10px;
          height: auto;
          width: 100%;
        }

        textarea {
          border: 3px dashed
            ${drag === DRAG_IMAGE_STATES.DRAG_OVER ? "#09f " : "transparent"};
          border-radius: 11px;
          font-size: 21px;
          min-height: 200px;
          transition: border 0.25s;
          padding: 15px;
          outline: 0;
          resize: none;
          width: 100%;
        }
      `}</style>
    </>
  )
}
