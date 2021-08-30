import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '@/modules/users/dtos/create-user/create-user.dto';
import {
  CreateUserRepository,
  LoadUserByEmailRepository,
} from '@/data/protocols/user';

@EntityRepository(UserEntity)
export class UsersRepository
  extends Repository<UserEntity>
  implements CreateUserRepository, LoadUserByEmailRepository
{
  public async add(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.create(createUserDto);
    return await this.save(newUser);
  }

  public async loadByEmail(email: string): Promise<UserEntity> {
    return await this.findOne({ where: { email } });
  }
}