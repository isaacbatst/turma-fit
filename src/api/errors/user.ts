export const patchUserErrors = {
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  NAME_REQUIRED: 'NAME_REQUIRED',
  NAME_STRING: 'NAME_STRING',
  NAME_LENGTH: 'NAME_LENGTH',
  ROLE_REQUIRED: 'ROLE_REQUIRED',
  ROLE_STRING: 'ROLE_STRING',
  ROLE_UNKNOWN: 'ROLE_UNKNOWN',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
}

export type PatchUserError = keyof (typeof patchUserErrors)

export const patchUserErrorCodes: Record<PatchUserError, number> = {
  USER_NOT_FOUND: 400,
  NAME_REQUIRED: 400,
  NAME_STRING: 400,
  NAME_LENGTH: 400,
  ROLE_REQUIRED: 400,
  ROLE_STRING: 400,
  ROLE_UNKNOWN: 422,
  UNKNOWN_ERROR: 455,
}