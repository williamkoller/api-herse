import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { userTransformer } from '@/modules/users/transformer/user/user.transformer';
import { UserOutputType } from '@/modules/users/types/user-output.type';

@Injectable()
export class LoadUserProfileService {
  constructor(private readonly userRepo: UsersRepository) {}

  public async loadUserProfile(id: number): Promise<UserOutputType> {
    const userExists = await this.userRepo.loadById(id);

    if (!userExists) {
      throw new NotFoundException('User not found.');
    }

    return userTransformer(userExists);
  }
}
