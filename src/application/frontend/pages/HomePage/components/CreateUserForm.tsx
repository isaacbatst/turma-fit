import Link from "next/link";
import { useCreateUserForm } from "../hooks/useCreateUserForm";

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
    <div>
      <h2>Criar usuário</h2>
      <form aria-label="Criar conta" onSubmit={(e) => handleFormSubmit(e)}>
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
        <label htmlFor="create-user-birthdate">
        Data de nascimento
          <input type="number" name="birthdate" id="create-user-birthdate" 
            value={birthdate} onChange={(e) => setBirthdate(e.target.value)}
          />
        </label>
        <label htmlFor="create-user-profile">
        Tipo de perfil
          <select name="profile" id="create-user-profile"
            value={profile} onChange={(e) => setProfile(e.target.value)}
          >
            <option disabled value="null">Selecione um tipo de perfil...</option>
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
        <p>Já possui uma conta? <Link href="/login">Entre aqui</Link></p>
        <button type="submit">Criar</button>
      </form>
      {error && <p>{getErrorMessage(error)}</p>}
    </div>
  )
}

export default CreateUserForm;