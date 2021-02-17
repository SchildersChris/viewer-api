import * as fs from 'fs';
import * as util from 'util';
import { Injectable } from '@nestjs/common';
import { ObjService } from '../obj.service';
import * as OBJFile from 'obj-file-parser';

@Injectable()
export class ObjSeeder {
  constructor(private readonly objService: ObjService) {}

  async seed() {
    const readFile = util.promisify(fs.readFile);
    const objFile1 = new OBJFile(await readFile('./assets/polar.obj', 'utf8'));
    const file1 = objFile1.parse();
    console.log(file1);

    await this.objService.create({
      name: 'Polar Bear',
      vertices: file1.models[0].vertices,
      indices: file1.models[0].faces.reduce((indices, f) => {
        indices.push(...(f.vertices?.map((v) => v.vertexIndex) ?? []));
        return indices;
      }, [])
    });

    const objFile2 = new OBJFile(await readFile('./assets/rabbit.obj', 'utf8'));
    const file2 = objFile2.parse();
    console.log(file2);

    await this.objService.create({
      name: 'Rabbit',
      vertices: file2.models[0].vertices,
      indices: file2.models[0].faces.reduce((indices, f) => {
        indices.push(...(f.vertices?.map((v) => v.vertexIndex) ?? []));
        return indices;
      }, [])
    });
  }
}
