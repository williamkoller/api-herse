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
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UsersRepository]),
    PassportModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        defaultStrategy: configService.get('DEFAULT_STRATEGY'),
        property: configService.get('PROPERTY_USERS'),
        session: configService.get('SESSION'),
      }),
    }),
  ],
  providers: [
    BcryptAdapter,
    CreateUserService,
    JwtAdapter,
    LoadUserByEmailService,
    LoadUserByIdService,
    LoadAllUsersService,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
