import { IVector3 } from '../../common/interface/vector3.interface';

export class CreateObjDto {
  public readonly name: string;
  public readonly vertices: IVector3[];
  public readonly indices: number[];
}
