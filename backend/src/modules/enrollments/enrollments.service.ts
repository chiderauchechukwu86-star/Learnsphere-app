import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enrollment, EnrollmentDocument } from './schemas/enrollment.schema';
import { CoursesService } from '../courses/courses.service';
import { CertificatesService } from '../certificates/certificates.service';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel(Enrollment.name) private enrollmentModel: Model<EnrollmentDocument>,
    private coursesService: CoursesService,
    private certificatesService: CertificatesService,
  ) {}

  async enroll(studentId: string, courseId: string) {
    const enrollment = await this.enrollmentModel.create({ studentId, courseId });
    await this.coursesService.incrementEnrollment(courseId);
    return enrollment;
  }

  myEnrollments(studentId: string) {
    return this.enrollmentModel
      .find({ studentId })
      .populate('courseId', 'title coverImageUrl slug instructorId')
      .sort({ updatedAt: -1 })
      .exec();
  }

  async findOne(studentId: string, courseId: string) {
    const enrollment = await this.enrollmentModel.findOne({ studentId, courseId }).exec();
    if (!enrollment) throw new NotFoundException('Not enrolled in this course');
    return enrollment;
  }

  /** Marks a lesson complete, recomputes percent-complete, and issues a certificate at 100%. */
  async markLessonComplete(studentId: string, courseId: string, lessonId: string, totalLessons: number) {
    const enrollment = await this.findOne(studentId, courseId);

    const existing = enrollment.lessonProgress.find((l) => l.lessonId === lessonId);
    if (existing) {
      existing.completed = true;
      existing.completedAt = new Date();
    } else {
      enrollment.lessonProgress.push({ lessonId, completed: true, lastPositionSeconds: 0, completedAt: new Date() });
    }

    const completedCount = enrollment.lessonProgress.filter((l) => l.completed).length;
    enrollment.percentComplete = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    if (enrollment.percentComplete >= 100 && enrollment.status !== 'completed') {
      enrollment.status = 'completed';
      enrollment.completedAt = new Date();
      await this.certificatesService.issueForEnrollment(enrollment);
    }

    await enrollment.save();
    return enrollment;
  }

  updatePlaybackPosition(studentId: string, courseId: string, lessonId: string, positionSeconds: number) {
    return this.enrollmentModel.updateOne(
      { studentId, courseId, 'lessonProgress.lessonId': lessonId },
      { $set: { 'lessonProgress.$.lastPositionSeconds': positionSeconds } },
      { upsert: false },
    ).exec();
  }
}
