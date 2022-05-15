import { useUser } from "@application/frontend/swr/useUser";
import { NextPage } from "next";
import CreateUserForm from "./CreateUserForm";

const HomePage: NextPage = () => {
  const { isLoading, user } = useUser();

  return (
    <div>
      <h1>Home</h1>
      {
        isLoading ? (
          <p role="status">Loading...</p>
        ) : (
          user 
            ? (
              <div>
                <div>Logado: {user.name}</div>
              </div>
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