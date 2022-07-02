import Link from "next/link";
import { useCreateUserForm } from "../hooks/useCreateUserForm";
import Input from "./Input";
import InputWrapper from "./InputWrapper";

const CreateUserForm: React.FC = () => {
  const {
    name, setName,
    email, setEmail,
    password, setPassword,
    repeatPassword, setRepeatPassword,
    birthdate, setBirthdate,
    profile, setProfile,
    error, getErrorMessage,
    handleFormSubmit
  } = useCreateUserForm();

  return (
    <div className="px-4">
      <h2 className="text-center mb-2 font-bold">Registre-se agora!</h2>
      <p className="text-center text-xs mb-5">Já possui uma conta? <Link href="/login"><a className="text-blue-600 underline">Entre aqui</a></Link></p>
      <form aria-label="Criar conta" onSubmit={(e) => handleFormSubmit(e)}>
        <Input 
          id="create-user-name"
          label="Nome"
          name="name"
          setValue={setName}
          value={name}
        />
        <Input 
          id="create-user-email"
          label="E-mail"
          name="email"
          setValue={setEmail}
          value={email}
          type="email"
        />
        <Input 
          id="create-user-birthdate"
          label="Data de Nascimento"
          name="birthdate"
          setValue={setBirthdate}
          value={birthdate}
          type="date"
        />
        <InputWrapper id="create-user-profile" label="Tipo de Perfil">
          <select name="profile" id="create-user-profile"
            className="bg-transparent border-white border-2 p-2 text-sm font-light
            focus:outline-none focus:font-light focus:bg-white focus:text-stone-800"
            value={profile} onChange={(e) => setProfile(e.target.value)}
          >
            <option className="text-stone-700" disabled value="null">Selecione um tipo de perfil...</option>
            <option className="text-stone-700" value="STUDENT">Aluno</option>
            <option className="text-stone-700" value="PERSONAL">Personal</option>
          </select>
        </InputWrapper>
        <Input 
          id="create-user-password"
          label="Senha"
          name="password"
          setValue={setPassword}
          value={password}
          type="password"
        />
        <Input 
          id="create-user-repeat-password"
          label="Confirme a senha"
          name="repeat-password"
          setValue={setRepeatPassword}
          value={repeatPassword}
          type="password"
        />
        <button 
          type="submit" 
          className="bg-white text-red-500 block w-full py-2 font-bold 
            active:bg-slate-100 hover:scale-105"
        >Cadastrar</button>
      </form>
      {error && <p>{getErrorMessage(error)}</p>}
    </div>
  )
}

export default CreateUserForm;