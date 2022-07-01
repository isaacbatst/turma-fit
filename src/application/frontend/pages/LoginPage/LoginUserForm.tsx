import React from 'react';
import useLoginForm from '../HomePage/hooks/useLoginForm';

const LoginUserForm: React.FC = () => {
  const {
    email, setEmail,
    password, setPassword,
    error,
    handleSubmit
  } = useLoginForm();

  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <form>
        <label htmlFor="email-login">
          Email
          <input 
            type="text" 
            name="email-login" 
            id="email-login" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password-login">
          Senha
          <input 
            type="password" 
            name="password-login" 
            id="password-login" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>Entrar</button>
      </form>
      {
        error && <div>{error}</div>
      }
    </div>
  )
}

export default LoginUserForm;