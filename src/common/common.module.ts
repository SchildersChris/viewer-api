import { Module } from '@nestjs/common';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [SeedModule],
  exports: [SeedModule]
})
export class CommonModule {}
