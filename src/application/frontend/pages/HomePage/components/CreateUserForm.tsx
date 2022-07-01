import Link from "next/link";
import { useCreateUserForm } from "../hooks/useCreateUserForm";

const CreateUserForm: React.FC = () => {
  const {
    name, setName,
    email, setEmail,
    password, setPassword,
    repeatPassword, setRepeatPassword,
    age, setAge,
    image,setImage,
    profile, setProfile,
    error, getErrorMessage,
    handleFormSubmit
  } = useCreateUserForm();

  return (
    <div className="px-4">
      <h2 className="text-center mb-2 font-bold">Registre-se agora!</h2>
      <p className="text-center text-xs mb-5">Já possui uma conta? <Link href="/login"><a className="text-blue-600 underline">Entre aqui</a></Link></p>
      <form aria-label="Criar conta" onSubmit={(e) => handleFormSubmit(e)}>
        <div className="flex flex-col mb-4">
          <label htmlFor="create-user-name" className="font-light mb-1 text-sm">
            Nome
          </label>
          <input type="text" name="name" id="create-user-name" 
            className="bg-transparent border-white border-2 p-2 text-sm"
            value={name} onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="create-user-email" className="font-light mb-1 text-sm">
            E-mail
          </label>
          <input type="email" name="email" id="create-user-email" 
            className="bg-transparent border-white border-2 p-2 text-sm"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="create-user-birthdate"
            className="font-light mb-1 text-sm"
          >
          Data de Nascimento
          </label>
          <input type="date" name="birthdate" id="create-user-birthdate" 
            className="bg-transparent border-white border-2 p-2 text-sm"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="create-user-profile"
            className="font-light mb-1 text-sm"
          >
        Tipo de perfil
          </label>

          <select name="profile" id="create-user-profile"
            className="bg-transparent border-white border-2 p-2 text-sm"

            value={profile} onChange={(e) => setProfile(e.target.value)}
          >
            <option disabled value="null">Selecione um tipo de perfil...</option>
            <option value="STUDENT">Aluno</option>
            <option value="PERSONAL">Personal</option>
          </select>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="create-user-password"

            className="font-light mb-1 text-sm"
          >
        Senha
          </label>
          <input type="password" name="password" 
            className="bg-transparent border-white border-2 p-2 text-sm"

            value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </div>
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