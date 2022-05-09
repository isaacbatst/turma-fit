import { TokenGenerator } from "@domain/common/TokenGenerator";
import crypto from 'node:crypto';

export class CryptoTokenGeneratorAdapter implements TokenGenerator {
  generate(): string {
    console.log(crypto.randomBytes(16).toString('hex'));
    console.log(crypto.randomBytes(16).toString('base64'));

    return crypto.randomBytes(20).toString('hex');
  }
}