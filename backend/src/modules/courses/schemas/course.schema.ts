import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourseDocument = Course & Document;

/** Embedded: a single paginated page of lesson content. */
@Schema({ _id: false })
class LessonPage {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) heading: string;
  @Prop({ type: [String], default: [] }) body: string[];
  @Prop({ type: [String], default: [] }) bullets: string[];
  @Prop() diagram?: string;
  @Prop() diagramCaption?: string;
}

@Schema({ _id: false })
class QuizQuestion {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) prompt: string;
  @Prop({ type: [String], required: true }) options: string[];
  @Prop({ required: true }) correctAnswer: string;
  @Prop() explanation?: string;
}

@Schema({ _id: false })
class LessonQuiz {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) title: string;
  @Prop({ default: 70 }) passingScore: number;
  @Prop({ type: [QuizQuestion], default: [] }) questions: QuizQuestion[];
}

/** Embedded within a section — read constantly with the course, so it lives inline.
 *  Lessons are text-based (paginated reading), not video, and every lesson ends
 *  in a gating quiz — matching the frontend `Lesson` shape in lib/types.ts. */
@Schema({ _id: false })
class Lesson {
  @Prop({ required: true }) id: string; // stable slug/uuid, not Mongo _id
  @Prop({ required: true }) title: string;
  @Prop({ default: 'reading', enum: ['reading'] }) type: string;
  @Prop({ default: 0 }) estimatedMinutes: number;
  @Prop({ default: false }) isPreview: boolean;
  @Prop({ type: [LessonPage], default: [] }) pages: LessonPage[];
  @Prop({ type: LessonQuiz }) quiz: LessonQuiz;
}

/** Embedded within course — the curriculum tree. */
@Schema({ _id: false })
class Section {
  @Prop({ required: true }) id: string;
  @Prop({ required: true }) title: string;
  @Prop({ type: [Lesson], default: [] }) lessons: Lesson[];
}

@Schema({ _id: false })
class Faq {
  @Prop({ required: true }) question: string;
  @Prop({ required: true }) answer: string;
}

/**
 * `courses` collection.
 * Curriculum (sections → lessons) is embedded for fast single-read pages.
 * Enrollments, reviews, and quizzes are referenced collections queried by courseId.
 */
@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, trim: true, index: true })
  title: string;

  @Prop({ trim: true })
  subtitle?: string;

  @Prop({ required: true, unique: true, index: true })
  slug: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  instructorId: Types.ObjectId;

  @Prop({ index: true })
  category: string;

  @Prop({ enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner', index: true })
  difficulty: string;

  @Prop({ default: 'English' })
  language: string;

  @Prop({ default: 0 })
  priceCents: number;

  @Prop({ default: 'USD' })
  currency: string;

  @Prop()
  coverImageUrl?: string;

  @Prop({ type: [Section], default: [] })
  curriculum: Section[];

  @Prop({ type: [Faq], default: [] })
  faqs: Faq[];

  @Prop({ type: [String], default: [], index: true })
  tags: string[];

  @Prop({ enum: ['draft', 'pending_review', 'published', 'rejected'], default: 'draft', index: true })
  status: string;

  // Denormalized aggregates — updated by the reviews/enrollments services on write,
  // so listing/search pages never need a fan-out query.
  @Prop({ default: 0 }) averageRating: number;
  @Prop({ default: 0 }) reviewCount: number;
  @Prop({ default: 0 }) enrollmentCount: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
CourseSchema.index({ title: 'text', description: 'text', tags: 'text' });
