import {
  Decrypter,
  Encrypter,
  VerifyTokenType,
} from '@/data/protocols/criptography';
import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type JwtPayloadType = {
  id: number;
  name: string;
  surname: string;
  email: string;
};

@Injectable()
export class JwtAdapter implements Encrypter, Decrypter {
  public async encrypt(user: UserEntity): Promise<string> {
    const jwtService = new JwtService({ secret: process.env.JWT_SECRET });
    const JwtPayloadType: JwtPayloadType = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
    };
    return jwtService.signAsync(JwtPayloadType);
  }

  public async decrypt(token: string): Promise<VerifyTokenType> {
    const jwtService = new JwtService({ secret: process.env.JWT_SECRET });
    return jwtService.verifyAsync(token);
  }
}
