export type VerifyTokenType = {
  id: number;
  name: string;
  surname: string;
  iat: Date;
  exp: string;
};

export interface Decrypter {
  decrypt: (token: string) => Promise<VerifyTokenType>;
}
