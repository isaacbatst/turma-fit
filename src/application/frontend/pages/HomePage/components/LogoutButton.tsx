import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      await axios.patch('/api/user/session')

      router.reload();
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <button type='button' className='border-2 border-white py-1 px-5 m-2 hover:scale-105 active:opacity-90' onClick={handleClick}>Sair</button>
  )
}

export default LogoutButton