import React from 'react'

const SubmitWorkoutPlan: React.FC = () => {
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    console.log('submit')
  }

  return (
    <button type="submit" 
      onClick={handleSubmit}
    >Finalizar Plano</button>
  )
}

export default SubmitWorkoutPlan