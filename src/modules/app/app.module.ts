import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envFilename from '@/config/environments/env-filename';
import { environments } from '@/config/environments/environments';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilename.development,
      load: [environments],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
