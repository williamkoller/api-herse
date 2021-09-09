import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { CreateUserDto } from '@/modules/users/dtos/create-user/create-user.dto';
import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';
import { LoadUserByEmailService } from '@/modules/users/services/load-user-by-email/load-user-by-email.service';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly bcryptAdapter: BcryptAdapter,
    private readonly loadUserByEmailService: LoadUserByEmailService,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    await this.loadUserByEmailService.loadByEmail(createUserDto.email);

    const data = {
      ...createUserDto,
      password: await this.bcryptAdapter.hash(createUserDto.password),
    };

    return await this.userRepo.add(data);
  }
}
