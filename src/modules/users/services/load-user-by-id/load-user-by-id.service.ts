import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { userTransformer } from '@/modules/users/transformer/user/user.transformer';
import { UserOutput } from '@/modules/users/interfaces/user-output.interface';

@Injectable()
export class LoadUserByIdService {
  constructor(private readonly userRepo: UsersRepository) {}

  public async loadById(id: number): Promise<UserOutput> {
    const userFound = await this.userRepo.loadById(id);

    if (!userFound) {
      throw new NotFoundException(`User with id: ${id} not found.`);
    }

    return userTransformer(userFound);
  }
}
