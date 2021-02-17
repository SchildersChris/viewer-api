import { Module } from '@nestjs/common';
import { Command, CommandModule } from 'nestjs-command';

import { ObjSeeder } from '../../obj/schema/obj.seeder';
import { ObjModule } from '../../obj/obj.module';

@Module({
  imports: [CommandModule, ObjModule],
  providers: [ObjSeeder],
  exports: [ObjSeeder]
})
export class SeedModule {
  constructor(private readonly objSeeder: ObjSeeder) {}

  @Command({
    command: 'seed',
    describe: 'Seed all seeds',
    autoExit: true
  })
  async seed() {
    await this.objSeeder.seed();
  }
}
