import { User } from '@prisma/client'
import axios from 'axios'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FormEventHandler, useEffect, useState } from 'react'
import { MdSend } from 'react-icons/md'
import Loading from '../../components/common/Loading'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import styles from '../../styles/pages/fill-data.module.scss'

const FillProfile: NextPage = () => {
  const session = useSession()
  const router = useRouter()
  const [name, setName] = useState("");

  useEffect(() => {
    if(session.data && session.data.user.name){
      setName(session.data.user.name)
    }
  }, [session.data])

  const handleSubmit:FormEventHandler<HTMLFormElement> = async (event) => {
    try {
      event.preventDefault();
    
      if(name.trim().length === 0){
        return
      }

      const response = await axios.patch<User>('/api/user', {
        name
      });

      if(response.status === 200) {
        // router.push() is not triggering session callback
        // so, to refresh the session
        router.reload();
      }
    } catch (error) {
      console.log(error)
    }
  }
 
  return (
    <Layout>
      <div>
        <Head>
          <title>Turma Fit</title>
        </Head>

        <Header />
        <div className={styles.wrap}>
          <section>
            {
              session.status === 'loading' && (
                <Loading />
              )
            }

            <form onSubmit={handleSubmit}>
              <label htmlFor="fill-data-name">
                Como você se chama?
              </label>
              <input type="text" name='name' placeholder='Thomas Shelby' id="fill-data-name" 
                value={name} onChange={(event) => setName(event.target.value)} required
              />

              {
                session.data && (!session.data.user.isStudent || !session.data.user.isPersonal) && (
                  <fieldset>
                    <legend>Você é:</legend>
                    <div className={styles.radioWrapper}>
                      <input type="radio" name="role" id="radio-role-student" />
                      <label htmlFor="radio-role-student">Aluno</label>
                      <input type="radio" name="role" id="radio-role-personal" />
                      <label htmlFor="radio-role-personal">Personal</label>
                    </div>
                  </fieldset>
                )
              }
              <button type="submit" >Continuar<MdSend /></button>
            </form>
              
          </section>
        </div>
      </div>
    </Layout>  
  )
}

export default FillProfile