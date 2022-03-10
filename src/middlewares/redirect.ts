type Params = {
  path: string,
}
const isThisPath = (path: string, reqPath: string) => reqPath === path
export const isApi = (path: string) => path.includes('/api/')

export const pathShouldBeRedirected = (path: string) => {
  if(isApi(path)) return

  if (isThisPath('/', path)) {
    return '/personal/students';
  }
}