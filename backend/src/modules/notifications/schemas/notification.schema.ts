import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NotificationDocument = Notification & Document;

export enum NotificationType {
  ENROLLMENT_CONFIRMATION = 'enrollment_confirmation',
  NEW_LESSON = 'new_lesson',
  QUIZ_AVAILABLE = 'quiz_available',
  ASSIGNMENT_DUE = 'assignment_due',
  COURSE_COMPLETED = 'course_completed',
  CERTIFICATE_READY = 'certificate_ready',
  NEW_REVIEW = 'new_review',
  INSTRUCTOR_ANNOUNCEMENT = 'instructor_announcement',
}

/** `notifications` collection — referenced by userId, delivered in-app and/or via email. */
@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: String, enum: NotificationType, required: true })
  type: NotificationType;

  @Prop({ required: true }) title: string;
  @Prop() body?: string;
  @Prop() linkUrl?: string;

  @Prop({ default: false, index: true })
  isRead: boolean;

  @Prop({ type: [String], default: ['in_app'] })
  channels: string[]; // 'in_app' | 'email'
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
