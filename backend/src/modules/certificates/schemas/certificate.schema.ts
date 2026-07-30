import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CertificateDocument = Certificate & Document;

/**
 * `certificates` collection.
 * Referenced, one-to-one with a completed enrollment. Created by a service
 * hook when EnrollmentsService detects 100% completion.
 */
@Schema({ timestamps: true })
export class Certificate {
  @Prop({ required: true, unique: true, index: true })
  certificateId: string; // human-shareable ID, e.g. LS-2026-000123

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  studentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true, index: true })
  courseId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Enrollment', required: true })
  enrollmentId: Types.ObjectId;

  @Prop({ required: true }) studentName: string;
  @Prop({ required: true }) courseName: string;
  @Prop({ required: true }) instructorName: string;
  @Prop({ required: true }) completionDate: Date;

  @Prop() pdfUrl?: string;
  @Prop() qrCodeDataUrl?: string;
  @Prop() digitalSignatureHash?: string;
}

export const CertificateSchema = SchemaFactory.createForClass(Certificate);
