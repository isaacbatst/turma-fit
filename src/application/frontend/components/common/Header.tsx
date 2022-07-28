import LogoutButton from '@application/frontend/pages/HomePage/components/LogoutButton';
import { useUser } from '@application/frontend/swr/useUser'
import Link from 'next/link'
import React from 'react'

const Header: React.FC = () => {
  const { user } = useUser(); 

  return (
    <header className='bg-black text-white h-16 text-center font-bold text-lg flex justify-center relative'>
      <Link href='/' passHref>
        <h1 className='cursor-pointer box-border hover:border-b-4 hover:border-b-white 
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          active:opacity-90'>
          <a>Turma Fit</a>
        </h1>
      </Link>
      {user && (
        <div className='absolute right-0  top-1/2 transform  -translate-y-1/2'>
          <LogoutButton />
        </div>
      )}
    </header>
  )
}

export default Header