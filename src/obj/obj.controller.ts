import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnprocessableEntityException,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { ObjService } from './obj.service';
import { Obj } from './schema/obj.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import ObjFile from 'obj-file-parser';
import { ApiParam } from '@nestjs/swagger';

@Controller('objects')
export class ObjController {
  constructor(private readonly service: ObjService) {}

  @Get()
  getAll(): Promise<Obj[]> {
    return this.service.findAll();
  }

  @Get(':name')
  @ApiParam({ name: 'name', type: String })
  get(@Param('name') name): Promise<Obj> {
    return this.service.findById(name);
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() name: string,
    @UploadedFile() file: Express.Multer.File
  ): Promise<Obj> {
    const objFile = new ObjFile(file.buffer.toString());
    const obj = objFile.parse();

    if (obj.models.length <= 0) throw new UnprocessableEntityException();

    return await this.service.create({
      name: 'Rabbit',
      vertices: obj.models[0].vertices,
      indices: obj.models[0].faces.reduce((indices, f) => {
        indices.push(...(f.vertices?.map((v) => v.vertexIndex) ?? []));
        return indices;
      }, [])
    });
  }
}
