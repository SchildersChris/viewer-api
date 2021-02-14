import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CONFIG_DATABASE_CONST } from '../../common/constants/config.constants';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<MongooseModuleOptions>(CONFIG_DATABASE_CONST)
    })
  ]
})
export class DatabaseModule {}
