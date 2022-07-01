import { useUser } from "@application/frontend/swr/useUser";
import { NextPage } from "next";
import UnauthenticatedView from "./components/UnauthenticatedView";
import UserHomeView from "./components/UserHomeView";

const HomePage: NextPage = () => {
  const { isLoading, user } = useUser();

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Home</h1>
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
    </div>
  )
}

export default HomePage;