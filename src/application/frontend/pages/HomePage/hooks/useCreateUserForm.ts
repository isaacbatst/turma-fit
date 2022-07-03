import { CreateUserRequestErrors } from "@application/api/usecases/CreateUser/CreateUserRequestErrors";
import { CreateUserUseCaseErrors } from "@domain/usecases/CreateUserUseCase/CreateUserUseCaseErrors";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useSWRConfig } from "swr";


type CreateUserApiErrors = CreateUserRequestErrors | CreateUserUseCaseErrors | 'DEFAULT'

const API_ERROR_TO_MESSAGE: Record<CreateUserApiErrors, string> = {
  INVALID_BIRTHDATE: "Data de nascimento inválida.",
  INVALID_EMAIL: "E-mail inválido.",
  INVALID_NAME: "Nome inválido.",
  INVALID_PASSWORD: "Senha inválida.",
  INVALID_PROFILE: "Tipo de perfil inválido.",
  PASSWORD_LENGTH: "Senha mínima de 8 caracteres.",
  BELOW_MIN_AGE: 'Idade mínima de 13 anos',
  REPEATED_EMAIL: "E-mail em uso.",
  UNKNOW_PROFILE: "Tipo de perfil desconhecido.",
  DEFAULT: 'Erro ao criar usuário.'
}

export const useCreateUserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [profile, setProfile] = useState("null");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useSWRConfig();

  const getErrorMessage = (error: string): string => {
    return API_ERROR_TO_MESSAGE[(error as CreateUserApiErrors)] || API_ERROR_TO_MESSAGE.DEFAULT;
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await axios.post('/api/user', {
        name,
        email,
        password,
        birthdate,
        profile
      })

      mutate('/api/user');
    } catch(e) {
      if(axios.isAxiosError(e)){
        if(!e.response){
          return setError('SERVER_ERROR')
        }

        if(e.response.status === 400){
          return setError(e.response.data.error)
        }
      }

      return setError('SERVER_ERROR')
    } finally {
      setIsLoading(false);
    }
  }

  return {
    name, setName,
    email, setEmail,
    password, setPassword,
    repeatPassword, setRepeatPassword,
    birthdate, setBirthdate,
    profile, setProfile,
    error, getErrorMessage,
    isLoading,
    handleFormSubmit
  }
}