import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { UserOutputType } from '@/modules/users/types/user-output.type';
import { userTransformer } from '@/modules/users/transformer/user/user.transformer';

@Injectable()
export class LoadUserByEmailService {
  constructor(private readonly userRepo: UsersRepository) {}

  public async loadByEmail(email: string): Promise<UserOutputType> {
    const user = await this.userRepo.loadByEmail(email);

    if (user) {
      throw new ConflictException('This email is already in use.');
    }

    return userTransformer(user);
  }
}
