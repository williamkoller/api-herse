import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { usersTransformer } from '@/modules/users/transformer/user/user.transformer';
import { UserOutputType } from '@/modules/users/types/user-output.type';

@Injectable()
export class LoadAllUsersService {
  constructor(private readonly userRepo: UsersRepository) {}

  public async loadAll(): Promise<UserOutputType[]> {
    const users = await this.userRepo.loadAll();

    if (!users.length) {
      throw new NotFoundException('No record found.');
    }

    return usersTransformer(users);
  }
}
