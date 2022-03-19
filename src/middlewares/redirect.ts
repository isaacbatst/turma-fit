import { isApi } from "../lib/url";

export const pathShouldBeRedirected = (path: string): string | void => {
  if(isApi(path)) return
}