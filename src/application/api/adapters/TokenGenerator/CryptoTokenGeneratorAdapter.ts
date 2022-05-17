import { TokenGenerator } from "@domain/common/TokenGenerator";
import crypto from 'node:crypto';

export class CryptoTokenGeneratorAdapter implements TokenGenerator {
  generate(): string {
    return crypto.randomBytes(20).toString('hex');
  }
}