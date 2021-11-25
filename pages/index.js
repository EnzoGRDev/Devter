import {useEffect, useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import AppLayout from '../components/AppLayout'
import Image from 'next/image'
import logo from '../public/logo-devter.svg'
import { colors } from '../styles/theme'
import Button from '../components/Button'
import GitHub from '../components/Icons/Github'
import loginWithGithub , { handleOnAuthStateChanged } from '../firebaseConfig/client'

export default function Home() {
  const [user, setUser] = useState(undefined);

  useEffect(()=>{
    handleOnAuthStateChanged(setUser)
  },[])

  const handleClick = () => {
    loginWithGithub()
      .then(res => {
        setUser(res)
        console.log(user)
      })
      .catch(error => console.error(error))
  }

  return (
    <div>
      <Head>
        <title>Devter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
        <Image src={logo} objectFit="contain" height="100%" width="120px" alt="logo devter"/>
        <h1>
          Devter
        </h1>
        <h2>
          Talk about development with developers 👨‍💻 👩‍💻 
        </h2>
        <br/>
        {user === null &&
          <Button onClick={handleClick}>
            <GitHub/>
            login with github
          </Button>
        }
        {
          user && <>
          <Image 
            src={`${user.photo}`} 
            alt={`Foto de ${user.username}`} 
            width="160px" 
            height="160px" 
            objectFit="contain"
          />
          <strong>{user.username}</strong>
          </>
        }
        </section>
      </AppLayout>
      <style jsx>{`
        section{
          display: grid;
          text-align: center;
          place-items: center;
          place-content: center;
          height: 100%;
        }

        h1 {
          color : ${colors.primary};
          margin-bottom: 0;
        }
        h2{
          font-size: 18px;
          color: ${colors.secondary};
          margin: 0;
        }
        nav {
          font-size: 24px;
          text-align: center;
        }
        a {
          text-decoration: none;
        }
      `}</style>
    </div>
  )
}
