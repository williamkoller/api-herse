import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type PayloadType = {
  id: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepo: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  public async validate(payloadType: PayloadType): Promise<UserEntity> {
    const user = await this.userRepo.loadById(payloadType.id);
    if (!user) {
      throw new UnauthorizedException('Unauthorized user.');
    }
    return user;
  }
}
