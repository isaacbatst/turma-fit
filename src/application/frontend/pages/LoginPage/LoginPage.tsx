import Header from '@application/frontend/components/common/Header'
import { NextPage } from 'next'
import LoginUserForm from './LoginUserForm'

const LoginPage: NextPage = () => {
  return (
    <div className='relative min-h-screen bg-red-500 text-white flex flex-col'>
      <Header />
      <main>
        <LoginUserForm />
      </main>
    </div>
  )
}


export default LoginPage