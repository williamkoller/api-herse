import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envFilename from '@/config/environments/env-filename';
import { environments } from '@/config/environments/environments';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '@/infra/db/config/config.service';
import { UsersModule } from '@/modules/users/users.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { RolesModule } from '@/modules/roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilename.environment,
      load: [environments],
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    forwardRef(() => RolesModule),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
