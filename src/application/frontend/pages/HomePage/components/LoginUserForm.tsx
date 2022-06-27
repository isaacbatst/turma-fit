import axios from 'axios';
import React, { useState } from 'react'

const LoginUserForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const handleSubmit: React.FormEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    axios.post('/api/user/session', {
      email,
      password
    })
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
        <button type="submit" onChange={handleSubmit}>Entrar</button>
      </form>
    </div>
  )
}

export default LoginUserForm;