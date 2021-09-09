import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { CreateUserService } from '@/modules/users/services/create-user/create-user.service';
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter/bcrypt-adapter';
import { LoadUserByEmailService } from '@/modules/users/services/load-user-by-email/load-user-by-email.service';
import { UsersController } from '@/modules/users/controllers/users.controller';
import { LoadUserByIdService } from '@/modules/users/services/load-user-by-id/load-user-by-id.service';
import { LoadAllUsersService } from '@/modules/users/services/load-all-users/load-all-users.service';
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoadUserByRoleService } from '@/modules/roles/services/load-user-by-role/load-user-by-role.service';
import { RolesRepository } from '@/modules/roles/repositories/roles.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UsersRepository, RolesRepository]),
    PassportModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        defaultStrategy: configService.get('defaultStrategy'),
        property: configService.get('property'),
        session: configService.get('session'),
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('secret'),
        signOptions: {
          expiresIn: configService.get('expiresIn'),
        },
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
    LoadUserByRoleService,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
