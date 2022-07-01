import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit: React.FormEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    setError(null);

    try {
      await axios.post('/api/user/session', {
        email,
        password
      })

      router.reload();
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

  return {
    email, setEmail,
    password, setPassword,
    error,
    handleSubmit
  }
}

export default useLoginForm;