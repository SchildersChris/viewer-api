import { Module } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';
import { ObjModule } from './obj/obj.module';

@Module({
  imports: [CommonModule, CoreModule, ObjModule]
})
export class AppModule {}
