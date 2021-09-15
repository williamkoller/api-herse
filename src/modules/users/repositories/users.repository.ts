import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '@/modules/users/dtos/create-user/create-user.dto';
import {
  AddUserRepository,
  LoadUserByEmailRepository,
  LoadUserByIdRepository,
  LoadAllUsersRepository,
  LastTimeLoggedRepository,
  UpdateUserRepository,
} from '@/data/protocols/user';
import { UpddateUserDto } from '@/modules/users/dtos/update-user/update-user.dto';

@EntityRepository(UserEntity)
export class UsersRepository
  extends Repository<UserEntity>
  implements
    AddUserRepository,
    LoadUserByEmailRepository,
    LoadUserByIdRepository,
    LoadAllUsersRepository,
    LastTimeLoggedRepository,
    UpdateUserRepository
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

  public async lastTimeLogged(userId: number, lastLogged: Date): Promise<void> {
    await this.query('UPDATE "users" SET "lastLogged" = $2 WHERE id = $1', [
      userId,
      lastLogged,
    ]);
  }

  public async updateUser(
    user: UserEntity,
    updateUserDto: UpddateUserDto,
  ): Promise<UserEntity> {
    const updateUser = this.merge(user, { ...updateUserDto });
    return await this.save(updateUser);
  }
}
