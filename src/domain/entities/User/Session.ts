import crypto from 'node:crypto';
import { v4 } from 'uuid';

export class Session {
  private id: string
  private token: string

  constructor(id?: string, token?: string) {
    this.id = id || v4();
    this.token = token || crypto.randomBytes(16).toString('base64');
  }

  getId() {
    return this.id;
  }

  getToken() {
    return this.token;
  }
}