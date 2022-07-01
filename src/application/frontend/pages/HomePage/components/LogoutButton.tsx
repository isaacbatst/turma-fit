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
      console.log(err)
    }
  }

  return (
    <button type='button' onClick={handleClick}>Sair</button>
  )
}

export default LogoutButton