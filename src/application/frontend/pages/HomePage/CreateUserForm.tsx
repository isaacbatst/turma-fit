import { useCreateUserForm } from "./useCreateUserForm";

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

        <button type="submit">Criar</button>
      </form>
      {error && <p>{getErrorMessage(error)}</p>}
    </div>
  )
}

export default CreateUserForm;