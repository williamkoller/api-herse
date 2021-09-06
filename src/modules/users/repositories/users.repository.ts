import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '@/modules/users/dtos/create-user/create-user.dto';
import {
  AddUserRepository,
  LoadUserByEmailRepository,
  LoadUserByIdRepository,
  LoadAllUsersRepository,
} from '@/data/protocols/user';

@EntityRepository(UserEntity)
export class UsersRepository
  extends Repository<UserEntity>
  implements
    AddUserRepository,
    LoadUserByEmailRepository,
    LoadUserByIdRepository,
    LoadAllUsersRepository
{
  public async add(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.create(createUserDto);
    return await this.save(newUser);
  }

  public async loadByEmail(email: string): Promise<UserEntity> {
    return await this.findOne({ where: { email } });
  }

  public async loadById(id: number): Promise<UserEntity> {
    return await this.findOne({ where: { id } });
  }

  public async loadAll(): Promise<UserEntity[]> {
    return await this.find();
  }
}
