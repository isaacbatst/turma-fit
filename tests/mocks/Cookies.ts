export const PERSONAL_WITH_ADVICE_COOKIE = 'personal-with-advice'
export const PERSONAL_WITHOUT_ADVICE_COOKIE = 'personal-without-advice';
export const UNAMED_USER_COOKIE = 'unamed-user';
export const USER_WITHOUT_ROLE_COOKIE = 'user-without-role';

export const getAuthCookie = (cookie: string) => `auth=${cookie}`