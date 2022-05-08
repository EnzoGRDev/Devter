import { useEffect, useState } from "react"
import AppLayout from "../../components/AppLayout"
import Devit from "../../components/Devit"
import { fetchLatestDevits } from "../../firebaseConfig/client"
import Create from "../../components/Icons/Create"
import Home from "../../components/Icons/Home"
import Search from "../../components/Icons/Search"
import { colors } from "../../styles/theme"
import useUser from "../../hooks/useUser"
import Link from "next/link"
import Head from "next/head"
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
        <Head>
          <title>Inicio / Devter</title>
        </Head>
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
                img={devit.img}
              />
            ))}
        </section>
        <nav>
          <Link href="/home">
            <a>
              <Home width={32} height={32} stroke="#09f" />
            </a>
          </Link>
          <Link href="/search">
            <a>
              <Search width={32} height={32} stroke="#09f" />
            </a>
          </Link>
          <Link href="/compose/tweet">
            <a>
              <Create width={32} height={32} stroke="#09f" />
            </a>
          </Link>
        </nav>
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
          flex: 1;
        }
        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          display: flex;
          height: 49px;
          position: sticky;
          width: 100%;
        }
        nav a {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          height: 100%;
          justify-content: center;
        }
        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }
        nav a:hover > :global(svg) {
          stroke: ${colors.primary};
      `}</style>
    </>
  )
}
