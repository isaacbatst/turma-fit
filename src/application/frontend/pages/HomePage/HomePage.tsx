import Loading from "@application/frontend/components/common/Loading";
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
          <div className="min-h-screen bg-red-500 flex items-center justify-center">
            <div className="text-center">
              <Loading />
            </div>
          </div>
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