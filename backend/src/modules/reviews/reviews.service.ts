import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    private coursesService: CoursesService,
  ) {}

  async create(studentId: string, courseId: string, rating: number, comment?: string) {
    const review = await this.reviewModel.findOneAndUpdate(
      { courseId, studentId },
      { rating, comment },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    await this.recomputeAggregate(courseId);
    return review;
  }

  delete(id: string, courseId: string) {
    return this.reviewModel.findByIdAndDelete(id).then(async (r) => {
      await this.recomputeAggregate(courseId);
      return r;
    });
  }

  forCourse(courseId: string, page = 1, limit = 10) {
    return this.reviewModel
      .find({ courseId })
      .populate('studentId', 'fullName avatarUrl')
      .sort({ isFeatured: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  reply(id: string, message: string) {
    return this.reviewModel
      .findByIdAndUpdate(id, { instructorReply: { message, repliedAt: new Date() } }, { new: true })
      .exec();
  }

  private async recomputeAggregate(courseId: string) {
    const stats = await this.reviewModel.aggregate([
      { $match: { courseId: new (require('mongoose').Types.ObjectId)(courseId) } },
      { $group: { _id: '$courseId', avg: { $avg: '$rating' }, count: { $sum: 1 } } },
    ]);
    const { avg = 0, count = 0 } = stats[0] || {};
    await this.coursesService.updateRatingAggregate(courseId, Math.round(avg * 10) / 10, count);
  }
}
