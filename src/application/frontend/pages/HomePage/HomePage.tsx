import { useUser } from "@application/frontend/swr/useUser";
import { NextPage } from "next";
import CreateUserForm from "./CreateUserForm";

const HomePage: NextPage = () => {
  const { error, isLoading, user } = useUser();

  return (
    <div>
      <h1>Home</h1>
      {
        isLoading ? (
          <p>Loading...</p>
        ) : (
          user 
            ? (
              <div>Logado: {user.name}</div>
            ) 
            : (
              <CreateUserForm />
            )
        )
      }
    </div>
  )
}

export default HomePage;