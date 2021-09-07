import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { userTransformer } from '@/modules/users/transformer/user/user.transformer';
import { UserOutputType } from '@/modules/users/types/user-output.type';

@Injectable()
export class LoadUserByIdService {
  constructor(private readonly userRepo: UsersRepository) {}

  public async loadById(id: number): Promise<UserOutputType> {
    const userFound = await this.userRepo.loadById(id);

    if (!userFound) {
      throw new NotFoundException(`User with id: ${id} not found.`);
    }

    return userTransformer(userFound);
  }
}
