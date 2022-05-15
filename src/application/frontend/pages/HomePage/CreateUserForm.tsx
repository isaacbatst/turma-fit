import { CreateUserBodyValidatorErrors } from "@application/api/usecases/CreateUser/CreateUserBodyValidatorErrors";
import { CreateUserUseCaseErrors } from "@domain/usecases/CreateUserUseCase/CreateUserUseCaseErrors";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useSWRConfig } from "swr";

type CreateUserApiErrors = CreateUserBodyValidatorErrors | CreateUserUseCaseErrors | 'DEFAULT'

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

const CreateUserForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [age, setAge] = useState(0);
  const [image, setImage] = useState("");
  const [profile, setProfile] = useState("");
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
        age,
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
  
  return (
    <div>
      <h2>Criar usuário</h2>
      <form action="" onSubmit={(e) => handleFormSubmit(e)}>
        <label htmlFor="create-user-name">
        Nome
          <input type="text" name="name" id="create-user-name" 
            value={name} onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="create-user-email">
        E-mail
          <input type="email" name="email" id="create-user-email" 
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="create-user-email">
        Imagem
          <input type="text" name="image" id="create-user-image" 
            value={image} onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <label htmlFor="create-user-age">
        Idade
          <input type="number" name="age" id="create-user-age" 
            value={age} onChange={(e) => setAge(Number(e.target.value))}
          />
        </label>
        <label htmlFor="create-user-profile">
        Tipo de perfil
          <select name="profile" id="create-user-profile"
            value={profile} onChange={(e) => setProfile(e.target.value)}
          >
            <option selected>Selecione um tipo de perfil...</option>
            <option value="STUDENT">Aluno</option>
            <option value="PERSONAL">Personal</option>
          </select>
        </label>
        <label htmlFor="create-user-password">
        Senha
          <input type="password" name="password" 
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="create-user-repeat-password">
        Confirmar senha
          <input type="password" name="repeat-password" 
            value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </label>

        <button type="submit">Criar</button>
      </form>
      {error && <p>{getErrorMessage(error)}</p>}
    </div>
  )
}

export default CreateUserForm;