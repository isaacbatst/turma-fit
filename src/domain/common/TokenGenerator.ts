export interface TokenGenerator {
  generate: (id: string, secret: string) => string
  decode: (token: string, secret: string) => string 
}