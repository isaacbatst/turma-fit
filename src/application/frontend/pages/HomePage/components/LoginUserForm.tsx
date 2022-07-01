import axios from 'axios';
import React, { useState } from 'react'

const LoginUserForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null)

  const handleSubmit: React.FormEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    setError(null);

    try {
      const response = await axios.post('/api/user/session', {
        email,
        password
      })
    } catch(error) {
      if(axios.isAxiosError(error)){
        if(error.response) {
          const castBody = error.response.data as { error: unknown };

          if(castBody && castBody.error && typeof castBody.error === 'string'){
            return setError(error.response.data.error)
          }
        }
      }
      
      setError('UNKNOWN_ERROR')
    }
  }

  return (
    <div>
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