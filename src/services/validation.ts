import { JWT } from "next-auth/jwt"

type ValidateParams = {
  path: string,
  token: JWT
}
const hasUserName = (token: JWT) => token.name

const isThisPath = (path: string, reqPath: string) => reqPath === path
const isNotApi = (path: string) => path.includes('/api/')

export const validate = ({ path, token }: ValidateParams) => {

  if (!hasUserName(token) && !isThisPath('/fill-profile', path) && isNotApi(path)) {
    return '/fill-profile';
  }

  if (isThisPath('/', path)) {
    return '/personal/students';
  }
}