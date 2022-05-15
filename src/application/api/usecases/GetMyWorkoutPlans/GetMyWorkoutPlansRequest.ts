import { CookiesNames } from "@application/api/common/CookiesNames"

export interface GetMyWorkoutPlansValidRequest {
  body: {
    userId: string,
  }
  cookies: {
    [CookiesNames.AUTHORIZATION]: string
  }
}

export interface GetMyWorkoutPlansRequest {
  body: Record<string, any>,
  cookies: Record<string, any>
}
