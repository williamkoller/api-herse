import { ValidateUserRepository } from '@/data/protocols/auth/validate-user.repository';
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter';
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserInputDto } from '@/modules/auth/dtos/user-input/user-input.dto';
import { TokenOutputDto } from '@/modules/auth/dtos/token-output/token-output.dto';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { LoadUserByEmailService } from '@/modules/users/services/load-user-by-email/load-user-by-email.service';

@Injectable()
export class AuthService implements ValidateUserRepository {
  constructor(
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly jwtAdapter: JwtAdapter,
    private readonly loadUserByEmailService: LoadUserByEmailService,
    private readonly usersRepo: UsersRepository,
  ) {}

  public async validateUser({
    email,
    password,
  }: UserInputDto): Promise<TokenOutputDto> {
    const user = await this.loadUserByEmailService.loadByEmail(email);

    const isValid = await this.bcryptAdapter.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Incorrect password or email.');
    }

    const accessToken = await this.jwtAdapter.encrypt(user);

    await this.lastTimeLogged(user.id);

    return {
      accessToken,
    };
  }

  private async lastTimeLogged(userId: number): Promise<void> {
    await this.usersRepo.lastTimeLogged(userId, new Date());
  }
}
