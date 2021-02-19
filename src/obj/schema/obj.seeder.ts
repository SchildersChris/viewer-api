import * as fs from 'fs';
import * as util from 'util';
import { Injectable } from '@nestjs/common';
import { ObjService } from '../obj.service';
import * as OBJFile from 'obj-file-parser';

@Injectable()
export class ObjSeeder {
  constructor(private readonly objService: ObjService) {}

  async seed() {
    await this.createObj('Polar Bear', './assets/polar.obj');
    await this.createObj('Rabbit', './assets/rabbit.obj');
    await this.createObj('Vector', './assets/vector.obj');
  }

  private async createObj(name: string, path: string) {
    const readFile = util.promisify(fs.readFile);
    const objFile = new OBJFile(await readFile(path, 'utf8'));
    const file = objFile.parse();

    await this.objService.create({
      name: name,
      vertices: file.models[0].vertices,
      indices: file.models[0].faces.reduce((indices, f) => {
        indices.push(...(f.vertices?.map((v) => v.vertexIndex) ?? []));
        return indices;
      }, [])
    });
  }
}
