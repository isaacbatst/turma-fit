import { useUser } from "@application/frontend/swr/useUser";
import { NextPage } from "next";
import UnauthenticatedView from "./components/UnauthenticatedView";
import UserHomeView from "./components/UserHomeView";

const HomePage: NextPage = () => {
  const { isLoading, user } = useUser();

  return (
    <>
      {
        isLoading ? (
          <p role="status">Loading...</p>
        ) : (
          user 
            ? (
              <UserHomeView user={user} />
            ) 
            : (
              <UnauthenticatedView />
            )
        )
      }
    </>
  )
}

export default HomePage;