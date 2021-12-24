import { NextPage } from "next";
import { signIn } from "next-auth/react";

const Login: NextPage = () => (
  <div>
    <button onClick={() => signIn()}>Login</button>
  </div>
)

export default Login;