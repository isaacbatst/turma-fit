const CreateUserForm: React.FC = () => {
  
  return (
    <form action="">
      <label htmlFor="create-user-name">
    Nome
        <input type="text" name="name" id="create-user-name" />
      </label>
      <label htmlFor="create-user-email">
    E-mail
        <input type="email" name="email" id="create-user-email" />
      </label>
      <label htmlFor="create-user-email">
    Imagem
        <input type="text" name="image" id="create-user-image" />
      </label>
      <label htmlFor="create-user-age">
    Idade
        <input type="text" name="age" id="create-user-age" />
      </label>
      <label htmlFor="create-user-profile-type">
    Tipo de perfil
        <select name="profile-type" id="create-user-profile-type">
          <option disabled>Selecione um tipo de perfil...</option>
          <option value="STUDENT">Aluno</option>
          <option value="PERSONAL">Personal</option>
        </select>
      </label>
      <label htmlFor="create-user-password">
    Senha
        <input type="password" name="password" />
      </label>
      <label htmlFor="create-user-repeat-password">
    Confirmar senha
        <input type="password" name="repeat-password" />
      </label>

      <button type="submit">Criar</button>
    </form>
  )
}

export default CreateUserForm;