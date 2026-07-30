import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from '../../../common/enums/role.enum';

export type UserDocument = User & Document;

/**
 * `users` collection.
 * Referenced (not embedded) by courses, enrollments, reviews, etc.,
 * since it's independently queried and updated across the whole app.
 */
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  fullName: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true, index: true })
  email: string;

  @Prop({ select: false })
  passwordHash?: string;

  @Prop()
  googleId?: string;

  @Prop({ type: String, enum: Role, default: Role.STUDENT, index: true })
  role: Role;

  @Prop()
  avatarUrl?: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ default: false })
  isInstructorApproved: boolean;

  @Prop()
  bio?: string;

  // Embedded — small, always read together with the profile, never queried independently.
  @Prop({
    type: {
      hoursLearned: { type: Number, default: 0 },
      lessonsCompleted: { type: Number, default: 0 },
      currentStreakDays: { type: Number, default: 0 },
      longestStreakDays: { type: Number, default: 0 },
      lastActivityAt: { type: Date },
    },
    default: () => ({}),
  })
  learningStats: {
    hoursLearned: number;
    lessonsCompleted: number;
    currentStreakDays: number;
    longestStreakDays: number;
    lastActivityAt?: Date;
  };

  @Prop({ type: [Types.ObjectId], ref: 'Course', default: [] })
  wishlist: Types.ObjectId[];

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
