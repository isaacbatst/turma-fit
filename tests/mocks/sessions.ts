import { Session } from "next-auth"

const DEFAULT_SESSION_EXPIRES = '2025-04-12T04:13:28.913Z'

export const LOGGED_SESSION_MOCK: Session = {
  expires: DEFAULT_SESSION_EXPIRES,
  user: {
    email: 'tes@tando.com',
    name: 'Isaac Personal',
    isPersonal: true,
    isStudent: true,
  }
}

export const LOGGED_SESSION_WITHOUT_NAME_MOCK: Session = {
  expires: DEFAULT_SESSION_EXPIRES,
  user: {
    email: 'tes@tando.com',
    isPersonal: true,
    isStudent: true,
  }
}

export const LOGGED_SESSION_WITHOUT_ROLE: Session = {
  expires: DEFAULT_SESSION_EXPIRES,
  user: {
    email: 'user@without.role',
    name: 'User Without Role',
    isPersonal: false,
    isStudent: false,
  }
}

export const LOGGED_SESSION_WITHOUT_NAME_AND_ROLE: Session = {
  expires: DEFAULT_SESSION_EXPIRES,
  user: {
    email: 'user@without.nameandrole',
    isPersonal: false,
    isStudent: false,
  }
}