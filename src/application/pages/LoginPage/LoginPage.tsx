import { GetServerSideProps, NextPage } from "next";
import CreateUserForm from "./CreateUserForm";

const LoginPage: NextPage = () => {
  return (
    <div>
      <h1>Home</h1>
      <h2>Criar usuário</h2>
      <CreateUserForm />
    </div>
  )
}

export const getLoginPageServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}
  }
}

export default LoginPage