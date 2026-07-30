import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(data: Partial<User>) {
    return this.userModel.create(data);
  }

  findByEmail(email: string, withPassword = false) {
    const query = this.userModel.findOne({ email: email.toLowerCase() });
    if (withPassword) query.select('+passwordHash');
    return query.exec();
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  findAll(filter: Partial<{ role: string; isInstructorApproved: boolean }> = {}) {
    return this.userModel.find(filter).sort({ createdAt: -1 }).exec();
  }

  update(id: string, data: Partial<User>) {
    return this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  approveInstructor(id: string) {
    return this.userModel
      .findByIdAndUpdate(id, { isInstructorApproved: true }, { new: true })
      .exec();
  }
}
