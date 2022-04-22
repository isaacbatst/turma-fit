import { TokenGenerator } from "@domain/common/TokenGenerator";
import jwt from 'jsonwebtoken';

export class JwtTokenGeneratorAdapter implements TokenGenerator {
  generate(id: string, secret: string): string {
    return jwt.sign(id, secret)
  }

  decode(token: string, secret: string): string {
    const decoded = jwt.verify(token, secret);

    if(typeof decoded === 'string'){
      return decoded;
    }

    console.log('token not string: ', decoded);
    
    throw new Error('INVALID_TOKEN')
  }
}