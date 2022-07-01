import React from 'react'
import CreateUserForm from './CreateUserForm'
import Header from './Header'
import LoginUserForm from '../../LoginPage/LoginUserForm'

const UnauthenticatedView: React.FC = () => {
  return (
    <>
      <Header />
      <CreateUserForm />
    </>
  )
}

export default UnauthenticatedView