import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users.repository';

@Injectable()
export class LoadUserByCpfService {
  constructor(private readonly usersRepo: UsersRepository) {}

  public async loadUserByCpf(cpf: string): Promise<UserEntity> {
    const userFound = await this.usersRepo.loadUserByCpf(cpf);

    if (!userFound) {
      throw new NotFoundException('User not found.');
    }

    return userFound;
  }
}
