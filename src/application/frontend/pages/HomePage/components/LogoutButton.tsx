import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { HiLogout } from 'react-icons/hi';

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
    <button type='button' className='py-1 px-3 hover:scale-105 active:opacity-90' onClick={handleClick}>
      <HiLogout />
    </button>
  )
}

export default LogoutButton