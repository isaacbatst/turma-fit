import React from 'react'
import CreateUserForm from './CreateUserForm'
import LoginUserForm from './LoginUserForm'

const UnauthenticatedView: React.FC = () => {
  return (
    <>
      <LoginUserForm />
      <CreateUserForm />
    </>
  )
}

export default UnauthenticatedView