import { JWT } from "next-auth/jwt"

type ValidateParams = {
  path: string,
}
const isThisPath = (path: string, reqPath: string) => reqPath === path
export const isApi = (path: string) => path.includes('/api/')

export const validate = ({ path }: ValidateParams) => {
  if(isApi(path)) return

  if (isThisPath('/', path)) {
    return '/personal/students';
  }
}