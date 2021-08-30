import { ConflictException, Injectable } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';

@Injectable()
export class LoadUserByEmailService {
  constructor(private readonly userRepo: UsersRepository) {}

  public async loadByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepo.loadByEmail(email);

    if (user) {
      throw new ConflictException('This email is already in use.');
    }

    return user;
  }
}
