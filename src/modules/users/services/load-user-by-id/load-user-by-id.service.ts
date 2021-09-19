import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';

@Injectable()
export class LoadUserByIdService {
  constructor(private readonly usersRepo: UsersRepository) {}

  public async loadById(id: number): Promise<UserEntity> {
    const userFound = await this.usersRepo.loadById(id);

    if (!userFound) {
      throw new NotFoundException(`User with id: ${id} not found.`);
    }

    return userFound;
  }
}
