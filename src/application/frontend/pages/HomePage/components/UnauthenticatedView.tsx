import React from 'react'
import CreateUserForm from './CreateUserForm'
import Header from './Header'

const UnauthenticatedView: React.FC = () => {
  return (
    <div className='bg-red-500 min-h-screen	text-white'>
      <Header />
      <CreateUserForm />
    </div>
  )
}

export default UnauthenticatedView