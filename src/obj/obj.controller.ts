import { Controller, Get, Param } from '@nestjs/common';
import { ObjService } from './obj.service';
import { Obj } from './schema/obj.schema';

import { ApiParam } from '@nestjs/swagger';

@Controller('objects')
export class ObjController {
  constructor(private readonly service: ObjService) {}

  @Get()
  getAll(): Promise<Obj[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  get(@Param('id') id): Promise<Obj> {
    return this.service.findById(id);
  }
}
