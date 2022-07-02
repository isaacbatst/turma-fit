import { CreateUserRequestErrors } from "@application/api/usecases/CreateUser/CreateUserRequestErrors";
import { CreateUserUseCaseErrors } from "@domain/usecases/CreateUserUseCase/CreateUserUseCaseErrors";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useSWRConfig } from "swr";


type CreateUserApiErrors = CreateUserRequestErrors | CreateUserUseCaseErrors | 'DEFAULT'

const API_ERROR_TO_MESSAGE: Record<CreateUserApiErrors, string> = {
  INVALID_AGE: "Age must be a number",
  INVALID_EMAIL: "Email is invalid",
  INVALID_NAME: "Name is invalid",
  INVALID_PASSWORD: "Password is invalid",
  INVALID_IMAGE: "Image is invalid",
  INVALID_PROFILE: "Profile is invalid",
  REPEATED_EMAIL: "Email is already in use",
  UNKNOW_PROFILE: "Profile is invalid",
  DEFAULT: 'Erro ao criar usuário'
}

export const useCreateUserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [image, setImage] = useState("");
  const [profile, setProfile] = useState("null");
  const [error, setError] = useState("");

  const { mutate } = useSWRConfig();

  const getErrorMessage = (error: string): string => {
    return API_ERROR_TO_MESSAGE[(error as CreateUserApiErrors)] || API_ERROR_TO_MESSAGE.DEFAULT;
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      await axios.post('/api/user', {
        name,
        email,
        password,
        birthdate,
        image,
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
    }
  }

  return {
    name, setName,
    email, setEmail,
    password, setPassword,
    repeatPassword, setRepeatPassword,
    birthdate, setBirthdate,
    image,setImage,
    profile, setProfile,
    error, getErrorMessage,
    handleFormSubmit
  }
}