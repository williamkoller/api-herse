import { ValidateUserRepository } from '@/data/protocols/auth/validate-user.repository';
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter';
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserInputDto } from '@/modules/auth/dtos/user-input/user-input.dto';
import { UserOutputDto } from '@/modules/auth/dtos/user-output/user-output.dto';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { userTransformer } from '@/modules/users/transformer/user/user.transformer';

@Injectable()
export class AuthService implements ValidateUserRepository {
  constructor(
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly jwtAdapter: JwtAdapter,
    private readonly userRepo: UsersRepository,
  ) {}

  public async validateUser({
    email,
    password,
  }: UserInputDto): Promise<UserOutputDto> {
    const user = await this.userRepo.loadByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Unauthorized user.');
    }

    const isValid = await this.bcryptAdapter.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Incorrect password or email.');
    }

    const token = await this.jwtAdapter.encrypt(user);

    const verifyToken = await this.jwtAdapter.decrypt(token);

    await this.lastTimeLogged(user.id);

    this.verifyIfUserHasToken(user.id, verifyToken.id);

    return {
      user: userTransformer(user),
      token,
    };
  }

  private verifyIfUserHasToken(userId: number, userTokenId: number): void {
    const userHasToken = () => userId !== userTokenId;

    if (userHasToken()) {
      throw new UnauthorizedException('Invalid token.');
    }
  }

  private async lastTimeLogged(userId: number): Promise<void> {
    await this.userRepo.lastTimeLogged(userId, new Date());
  }
}
