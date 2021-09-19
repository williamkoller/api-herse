import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { userTransformer } from '@/modules/users/transformer/user/user.transformer';
import { UserOutput } from '@/modules/users/interfaces/user-output.interface';

@Injectable()
export class LoadUserProfileService {
  constructor(private readonly usersRepo: UsersRepository) {}

  public async loadUserProfile(id: number): Promise<UserOutput> {
    const userExists = await this.usersRepo.loadById(id);

    if (!userExists) {
      throw new NotFoundException('User not found.');
    }

    return userTransformer(userExists);
  }
}
