import { Hasher, HashComparer } from '@/data/protocols/criptography';
import { Injectable } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class BcryptAdapter implements Hasher, HashComparer {
  public async hash(plaintext: string): Promise<string> {
    const salt = genSaltSync();
    return hashSync(plaintext, salt);
  }

  public async compare(plaintext: string, digest: string): Promise<boolean> {
    return compareSync(plaintext, digest);
  }
}
