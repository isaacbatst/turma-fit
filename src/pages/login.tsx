import { CookiesNames } from "@application/api/common/CookiesNames";
import LoginPage from "@application/frontend/pages/LoginPage/LoginPage";
import { GetServerSideProps } from "next";
import { prisma } from "src/lib/prisma";

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies[CookiesNames.AUTHORIZATION];

  if(!token) {
    return {
      props: {}
    }
  };


  const session = prisma.session.findFirst({
    where: {
      token
    }
  })

  if(!session) {
    return {
      props: {}
    }
  }

  return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }
};