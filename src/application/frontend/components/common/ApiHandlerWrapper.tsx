import React from 'react'
import Loading from './Loading'

interface Props {
  isLoading: boolean,
  error: unknown,
}

const ApiHandlerWrapper: React.FC<Props> = ({ error, isLoading, children }) => {
  return (
    <>
      {
        isLoading && (
          <div className="flex justify-center py-2 mb-2">
            <Loading size={4} />
          </div>
        )
      }
      {
        error && (
          <div role="alert">Não foi possível carregar os equipamentos</div>
        )
      }
      {children}
    </>
  )
}

export default ApiHandlerWrapper