import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Obj, ObjDocument } from './schema/obj.schema';
import { CreateObjDto } from './dto/create-obj.dto';

@Injectable()
export class ObjService {
  constructor(
    @InjectModel(Obj.name)
    private readonly objModel: Model<ObjDocument>
  ) {}

  async create(objDto: CreateObjDto): Promise<Obj> {
    console.dir(objDto);
    const obj = new this.objModel(objDto);
    return obj.save();
  }

  async findById(name: string): Promise<Obj> {
    return this.objModel.findOne({ name: name }).exec();
  }

  async findAll(): Promise<Obj[]> {
    return this.objModel.find().exec();
  }
}
