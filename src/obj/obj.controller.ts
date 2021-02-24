import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
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
  async get(@Param('id') id): Promise<Obj> {
    const obj = await this.service.findById(id);
    if (obj === null) {
      throw new BadRequestException('Invalid object id');
    }
    return obj;
  }
}
