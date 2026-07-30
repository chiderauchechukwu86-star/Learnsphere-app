import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type QuizDocument = Quiz & Document;

@Schema({ _id: false })
class Question {
  @Prop({ required: true }) id: string;
  @Prop({ required: true, enum: ['single', 'multiple', 'boolean', 'fill_blank'] })
  type: string;
  @Prop({ required: true }) prompt: string;
  @Prop({ type: [String], default: [] }) options: string[];
  @Prop({ type: [String], required: true }) correctAnswers: string[]; // indices or strings, per type
  @Prop({ default: 1 }) marks: number;
}

/**
 * `quizzes` collection — referenced by courseId (and optionally lessonId),
 * queried independently of the course document for the quiz-taking flow.
 */
@Schema({ timestamps: true })
export class Quiz {
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true, index: true })
  courseId: Types.ObjectId;

  @Prop()
  lessonId?: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: [Question], default: [] })
  questions: Question[];

  @Prop({ default: 0 })
  timeLimitSeconds: number; // 0 = untimed

  @Prop({ default: 70 })
  passingScorePercent: number;

  @Prop({ default: 3 })
  maxAttempts: number;

  @Prop({ default: true })
  randomizeQuestions: boolean;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);

export type QuizAttemptDocument = QuizAttempt & Document;

/** `quizAttempts` collection — one document per student attempt, referenced by quizId + studentId. */
@Schema({ timestamps: true })
export class QuizAttempt {
  @Prop({ type: Types.ObjectId, ref: 'Quiz', required: true, index: true })
  quizId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  studentId: Types.ObjectId;

  @Prop({ type: [{ questionId: String, submittedAnswers: [String] }], default: [] })
  answers: { questionId: string; submittedAnswers: string[] }[];

  @Prop({ default: 0 })
  scorePercent: number;

  @Prop({ default: false })
  passed: boolean;

  @Prop({ default: Date.now })
  submittedAt: Date;
}

export const QuizAttemptSchema = SchemaFactory.createForClass(QuizAttempt);
