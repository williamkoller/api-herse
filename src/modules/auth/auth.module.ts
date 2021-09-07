import { Module } from '@nestjs/common';
import { AuthService } from '@/modules/auth/services/auth.service';
import { BcryptAdapter } from '@/infra/criptography/bcript-adapter/bcrypt-adapter';
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from '@/modules/users/repositories/users.repository';
import { UserEntity } from '@/infra/db/entities/user-entity/user-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '@/modules/auth/strategies/jwt.strategy';
import { AuthController } from '@/modules/auth/controllers/auth.controller';
import { LoadUserProfileService } from '@/modules/users/services/load-user-profile/load-user-profile.service';

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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN'),
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    BcryptAdapter,
    JwtAdapter,
    JwtStrategy,
    LoadUserProfileService,
  ],
  controllers: [AuthController],
  exports: [JwtStrategy],
})
export class AuthModule {}
