import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import ServerConfig from '../../config/server.config';
import DatabaseConfig from '../../config/database.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [DatabaseConfig, ServerConfig]
    })
  ]
})
export class ConfigModule {}
