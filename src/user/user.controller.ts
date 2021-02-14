import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  get(): Promise<User[]> {
    return this.service.findAll();
  }
}
