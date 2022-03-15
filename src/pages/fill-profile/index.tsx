import { User } from '@prisma/client'
import axios from 'axios'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FormEventHandler, useState } from 'react'
import { MdSend } from 'react-icons/md'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import styles from '../../styles/pages/fill-data.module.scss'


const FillProfile: NextPage = () => {
  const [name, setName] = useState("");
  const router = useRouter()
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
            <form onSubmit={handleSubmit}>
              <label htmlFor="fill-data-name">
                Como você se chama?
              </label>
              <input type="text" name='name' placeholder='Thomas Shelby' id="fill-data-name" 
                value={name} onChange={(event) => setName(event.target.value)} required
              />
              <button type="submit" >Continuar<MdSend /></button>
            </form>
          </section>
        </div>
      </div>
    </Layout>  
  )
}

export default FillProfile