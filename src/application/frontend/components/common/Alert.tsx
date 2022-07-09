import React from 'react'

interface Props {
  message: string
}

const Alert: React.FC<Props> = ({ message }) => {
  return (
    <div className="px-4 py-3 text-xs text-yellow-700 bg-yellow-10 dark:bg-yellow-200 dark:text-yellow-800" 
      role="alert">
      {message}
    </div>
  )
}

export default Alert