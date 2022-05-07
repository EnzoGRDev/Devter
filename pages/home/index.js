import { useEffect, useState } from "react"
import AppLayout from "../../components/AppLayout"
import Avatar from "../../components/Avatar"
import Devit from "../../components/Devit"
import { fetchLatestDevits } from "../../firebaseConfig/client"
import useUser from "../../hooks/useUser"
// import {fetchLatestDevits}

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()
  useEffect(() => {
    //   fetch("/api/statuses/home_timeline")
    //     .then((res) => res.json())
    //     .then(setTimeline)

    user &&
      fetchLatestDevits()
        .then((res) => {
          console.log("la res =>", res)
          setTimeline(res)
        })
        .catch((err) => console.log(err))
  }, [user])

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.length &&
            timeline.map((devit) => (
              <Devit
                id={devit.id}
                key={devit.id}
                userId={devit.userId}
                avatar={devit.avatar}
                content={devit.content}
                userName={devit.userName}
                createdAt={devit.createdAt}
              />
            ))}
        </section>
        <nav></nav>
      </AppLayout>
      <style jsx>{`
        header {
          align-items: center;
          border-bottom: 1px solid #ccc;
          background: #ffffffaa;
          height: 49px;
          display: flex;
          position: sticky;
          top: 0;
          width: 100%;
        }
        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }
        section {
          padding-top: 49px;
        }
        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  )
}
