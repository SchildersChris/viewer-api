import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const result = new this.userModel(user);
    return result.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
