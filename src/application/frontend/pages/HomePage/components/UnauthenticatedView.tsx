import React from 'react'
import CreateUserForm from './CreateUserForm'
import CreateWorkoutPlanForm from './CreateWorkoutPlanForm/CreateWorkoutPlanForm'
import Header from './Header'

const UnauthenticatedView: React.FC = () => {
  return (
    <div className='bg-red-500 min-h-screen	text-white'>
      <Header />
      <section className='bg-blue-900 py-5'>
        <h2 className='text-center font-bold mb-5'>Registre seus treinos agora!</h2>
        <CreateWorkoutPlanForm />
      </section>
      <CreateUserForm />
    </div>
  )
}

export default UnauthenticatedView