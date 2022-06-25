import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from '../../models/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(dto: CreateUserDto): Promise<User> {
    return await this.userModel.create({
      ...dto,
    });
  }

  async getOne(id: ObjectId): Promise<User> {
    return this.userModel.findById(id);
  }
}
