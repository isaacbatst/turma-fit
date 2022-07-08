import { AuthenticateUserRequestErrors } from '@application/api/usecases/AuthenticateUser/AuthenticateUserRequestValidator';
import Alert from '@application/frontend/components/common/Alert';
import Loading from '@application/frontend/components/common/Loading';
import { AuthenticateUserUseCaseErrors } from '@domain/usecases/AuthenticateUserUseCase/AuthenticateUserUseCase';
import React from 'react';
import useLoginForm from '../HomePage/hooks/useLoginForm';

type LoginError = AuthenticateUserRequestErrors | AuthenticateUserUseCaseErrors

const readableErrors: Record<LoginError, string> = {
  EMAIL_NOT_FOUND: 'E-mail não encontrado',
  EMPTY_EMAIL: 'E-mail vazio',
  EMPTY_PASSWORD: 'Senha vazia',
  INCORRECT_EMAIL_OR_PASSWORD: 'E-mail ou senha incorretos',
  INVALID_EMAIL: 'E-mail inválido',
  INVALID_PASSWORD: 'Senha inválida',
}

const LoginUserForm: React.FC = () => {
  const {
    email, setEmail,
    password, setPassword,
    error, isLoading,
    handleSubmit, isAuthenticated
  } = useLoginForm();

  return (
    isAuthenticated ? (
      <div className="min-h-screen bg-red-500 flex items-center justify-center">
        <div className="text-center">
          <Loading />
        </div>
      </div>
    ) :
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4'>
        {
          error && <Alert message={readableErrors[(error as LoginError)] || 'Erro desconhecido' } />
        }
        <form>
          <div className="flex flex-col mb-2">
            <label htmlFor="email-login" className='mb-2'>
          Email
            </label>
            <input 
              type="email" 
              name="email-login" 
              className='bg-transparent border-2 border-white rounded p-2 outline-white'
              id="email-login" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="password-login" className='mb-2'>
          Senha
            </label>
            <input 
              type="password" 
              className='bg-transparent border-2 border-white rounded p-2 outline-white'
              name="password-login" 
              id="password-login" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className='bg-white text-red-500 w-full py-2 hover:opacity-95 active:scale-105x' 
            type="submit" onClick={handleSubmit}
            disabled={isLoading}  
          >
            {isLoading ? '...' : 'Entrar'}
          </button>
        </form>

      </div>
  )
}

export default LoginUserForm;