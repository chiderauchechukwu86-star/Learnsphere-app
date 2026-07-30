import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ _id: false })
class InstructorReply {
  @Prop({ required: true }) message: string;
  @Prop({ default: Date.now }) repliedAt: Date;
}

/**
 * `reviews` collection — referenced by courseId, queried independently
 * for pagination/sorting on the course page rather than embedded in Course.
 */
@Schema({ timestamps: true })
export class Review {
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true, index: true })
  courseId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  studentId: Types.ObjectId;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop()
  comment?: string;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ type: InstructorReply })
  instructorReply?: InstructorReply;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
ReviewSchema.index({ courseId: 1, studentId: 1 }, { unique: true });
