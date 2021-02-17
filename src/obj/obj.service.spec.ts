import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ObjModule } from './obj.module';
import { ObjService } from './obj.service';
import { Obj } from './schema/obj.schema';

describe('ObjService', () => {
  let service: ObjService;

  const mockRepository = {
    find() {
      return {};
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ObjModule]
    })
      .overrideProvider(getModelToken(Obj.name))
      .useValue(mockRepository)
      .compile();

    service = module.get<ObjService>(ObjService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
