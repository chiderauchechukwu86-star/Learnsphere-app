import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EnrollmentDocument = Enrollment & Document;

/** Embedded — one lesson-completion record. Small and always read with the enrollment. */
@Schema({ _id: false })
class LessonProgress {
  @Prop({ required: true }) lessonId: string;
  @Prop({ default: false }) completed: boolean;
  @Prop({ default: 0 }) lastPositionSeconds: number;
  @Prop() completedAt?: Date;
}

/**
 * `enrollments` collection.
 * One document per (student, course) pair. Progress is embedded since it's
 * only ever read/written alongside its parent enrollment.
 */
@Schema({ timestamps: true })
export class Enrollment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  studentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true, index: true })
  courseId: Types.ObjectId;

  @Prop({ enum: ['active', 'completed', 'refunded'], default: 'active' })
  status: string;

  @Prop({ type: [LessonProgress], default: [] })
  lessonProgress: LessonProgress[];

  @Prop({ default: 0 })
  percentComplete: number;

  @Prop()
  completedAt?: Date;

  @Prop({ default: Date.now })
  enrolledAt: Date;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
EnrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });
