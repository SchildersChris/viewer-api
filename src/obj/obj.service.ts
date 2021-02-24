import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Obj, ObjDocument } from './schema/obj.schema';
import { CreateObjDto } from './dto/create-obj.dto';

@Injectable()
export class ObjService {
  constructor(
    @InjectModel(Obj.name)
    private readonly objModel: Model<ObjDocument>
  ) {}

  async create(objDto: CreateObjDto): Promise<Obj> {
    const obj = new this.objModel(objDto);
    return obj.save();
  }

  async findById(id: string): Promise<Obj> {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return Promise.resolve(null);
    }
    return this.objModel.findById(id).exec();
  }

  async findAll(): Promise<Obj[]> {
    return this.objModel.find().exec();
  }
}
