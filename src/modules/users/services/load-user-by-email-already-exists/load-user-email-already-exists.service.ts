import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';

@Injectable()
export class LoadUserEmailAlreadyExistsService {
  constructor(private readonly usersRepo: UsersRepository) {}

  public async loadByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepo.loadByEmail(email);

    if (user) {
      throw new ConflictException('E-mail is already in use');
    }

    return user;
  }
}
