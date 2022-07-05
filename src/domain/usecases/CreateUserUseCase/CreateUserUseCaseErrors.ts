export enum CreateUserUseCaseErrors {
  REPEATED_EMAIL = 'REPEATED_EMAIL',
  UNKNOW_PROFILE = 'UNKNOW_PROFILE',
  BELOW_MIN_AGE = 'BELOW_MIN_AGE',
  INVALID_BIRTHDATE = 'INVALID_BIRTHDATE',
  PASSWORD_LENGTH = 'PASSWORD_LENGTH'
}