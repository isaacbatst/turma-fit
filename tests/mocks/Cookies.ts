export const PERSONAL_WITH_ADVICE = 'personal-with-advice'
export const PERSONAL_WITHOUT_ADVICE = 'personal-without-advice';
export const UNAMED_USER = 'unamed-user';
export const USER_WITHOUT_ROLE = 'user-without-role';

export const getAuthCookie = (cookie: string) => `auth=${cookie}`