import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { CreateUserService } from '@/modules/users/services/create-user/create-user.service';
import { BcryptAdapter } from '@/infra/criptography/bcript-adapter/bcrypt-adapter';
import { LoadUserByEmailService } from '@/modules/users/services/load-user-by-email/load-user-by-email.service';
import { UsersController } from '@/modules/users/controllers/users.controller';
import { LoadUserByIdService } from '@/modules/users/services/load-user-by-id/load-user-by-id.service';
import { LoadAllUsersService } from '@/modules/users/services/load-all-users/load-all-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UsersRepository])],
  providers: [
    CreateUserService,
    LoadUserByEmailService,
    LoadUserByIdService,
    LoadAllUsersService,
    BcryptAdapter,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
