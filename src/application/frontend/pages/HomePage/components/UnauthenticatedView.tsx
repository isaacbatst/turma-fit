import React from 'react'
import CreateUserForm from './CreateUserForm'
import CreateWorkoutPlanForm from './CreateWorkoutPlanForm/CreateWorkoutPlanForm'
import Header from './Header'

const UnauthenticatedView: React.FC = () => {
  return (
    <div className='bg-red-500 min-h-screen	text-white'>
      <Header />
      <section className='text-center'>
        {/* <div className='mb-3'>
          <h2 className='text-center font-bold mb-2'>Registre seus treinos agora!</h2>
          <a href="#register-user" 
            className='text-xs text-blue-900 underline bg-slate-300 text-center p-1'>
          Ou crie sua conta aqui
          </a>
        </div> */}
        <CreateWorkoutPlanForm />
      </section>
      <section className='py-5' id="register-user">
        <CreateUserForm />
      </section>
    </div>
  )
}

export default UnauthenticatedView