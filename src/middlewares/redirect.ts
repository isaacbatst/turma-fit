import { isApi } from "../lib/url";

export const pathShouldBeRedirected = (path: string) => {
  if(isApi(path)) return
}