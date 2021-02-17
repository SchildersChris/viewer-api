import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IVector3 } from '../../common/interface/vector3.interface';

export type ObjDocument = Obj & Document;

@Schema()
export class Obj {
  @Prop()
  name: string;
  @Prop()
  vertices: IVector3[];
  @Prop()
  indices: number[];
}

export const ObjSchema = SchemaFactory.createForClass(Obj);
