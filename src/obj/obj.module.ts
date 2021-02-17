import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Obj, ObjSchema } from './schema/obj.schema';
import { ObjController } from './obj.controller';
import { ObjService } from './obj.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Obj.name, schema: ObjSchema }])],
  controllers: [ObjController],
  providers: [ObjService],
  exports: [ObjService]
})
export class ObjModule {}
