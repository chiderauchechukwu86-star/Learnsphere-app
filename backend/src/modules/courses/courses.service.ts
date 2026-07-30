import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';

export interface CourseSearchQuery {
  q?: string;
  category?: string;
  difficulty?: string;
  price?: 'free' | 'paid';
  minRating?: number;
  sort?: 'popular' | 'newest' | 'rating' | 'enrolled';
  page?: number;
  limit?: number;
}

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  async search(query: CourseSearchQuery) {
    const filter: Record<string, any> = { status: 'published' };
    if (query.q) filter.$text = { $search: query.q };
    if (query.category) filter.category = query.category;
    if (query.difficulty) filter.difficulty = query.difficulty;
    if (query.price === 'free') filter.priceCents = 0;
    if (query.price === 'paid') filter.priceCents = { $gt: 0 };
    if (query.minRating) filter.averageRating = { $gte: query.minRating };

    const sortMap: Record<string, any> = {
      popular: { enrollmentCount: -1 },
      newest: { createdAt: -1 },
      rating: { averageRating: -1 },
      enrolled: { enrollmentCount: -1 },
    };
    const sort = sortMap[query.sort || 'popular'];

    const page = query.page || 1;
    const limit = query.limit || 20;

    const [items, total] = await Promise.all([
      this.courseModel
        .find(filter)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit)
        .select('-curriculum') // curriculum omitted from list views — detail view only
        .exec(),
      this.courseModel.countDocuments(filter),
    ]);

    return { items, total, page, pages: Math.ceil(total / limit) };
  }

  async findBySlug(slug: string) {
    const course = await this.courseModel.findOne({ slug }).exec();
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async findById(id: string) {
    const course = await this.courseModel.findById(id).exec();
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  findByInstructor(instructorId: string) {
    return this.courseModel.find({ instructorId }).sort({ createdAt: -1 }).exec();
  }

  create(instructorId: string, data: Partial<Course>) {
    return this.courseModel.create({ ...data, instructorId, status: 'draft' });
  }

  update(id: string, data: Partial<Course>) {
    return this.courseModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  submitForReview(id: string) {
    return this.courseModel
      .findByIdAndUpdate(id, { status: 'pending_review' }, { new: true })
      .exec();
  }

  moderate(id: string, status: 'published' | 'rejected') {
    return this.courseModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  delete(id: string) {
    return this.courseModel.findByIdAndDelete(id).exec();
  }

  incrementEnrollment(id: string) {
    return this.courseModel.updateOne({ _id: id }, { $inc: { enrollmentCount: 1 } }).exec();
  }

  /** Recomputes the denormalized rating aggregate after a review is written. */
  updateRatingAggregate(id: string, averageRating: number, reviewCount: number) {
    return this.courseModel.updateOne({ _id: id }, { averageRating, reviewCount }).exec();
  }
}
