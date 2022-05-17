import { CookiesNames } from "@application/api/common/CookiesNames"

export interface GetMyWorkoutPlansValidRequest {
  query: {
    userId: string,
  }
  cookies: {
    [CookiesNames.AUTHORIZATION]: string
  }
}

export interface GetMyWorkoutPlansRequest {
  query: Record<string, any>,
  cookies: Record<string, any>
}
