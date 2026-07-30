import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as crypto from 'crypto';
import * as QRCode from 'qrcode';
import { Certificate, CertificateDocument } from './schemas/certificate.schema';

@Injectable()
export class CertificatesService {
  constructor(
    @InjectModel(Certificate.name) private certificateModel: Model<CertificateDocument>,
  ) {}

  /**
   * Called by EnrollmentsService the moment an enrollment hits 100% completion.
   * Generates a unique certificate ID, a verification QR code, and a signature
   * hash so `/certificates/verify/:id` can confirm authenticity without a login.
   */
  async issueForEnrollment(enrollment: any) {
    const populated = await enrollment.populate([
      { path: 'studentId', select: 'fullName' },
      { path: 'courseId', select: 'title instructorId', populate: { path: 'instructorId', select: 'fullName' } },
    ]);

    const certificateId = `LS-${new Date().getFullYear()}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/certificates/verify/${certificateId}`;
    const qrCodeDataUrl = await QRCode.toDataURL(verifyUrl);

    const digitalSignatureHash = crypto
      .createHash('sha256')
      .update(`${certificateId}:${populated.studentId._id}:${populated.courseId._id}:${Date.now()}`)
      .digest('hex');

    return this.certificateModel.create({
      certificateId,
      studentId: populated.studentId._id,
      courseId: populated.courseId._id,
      enrollmentId: populated._id,
      studentName: populated.studentId.fullName,
      courseName: populated.courseId.title,
      instructorName: populated.courseId.instructorId.fullName,
      completionDate: new Date(),
      qrCodeDataUrl,
      digitalSignatureHash,
    });
  }

  myCertificates(studentId: string) {
    return this.certificateModel.find({ studentId }).sort({ createdAt: -1 }).exec();
  }

  async verify(certificateId: string) {
    const cert = await this.certificateModel.findOne({ certificateId }).exec();
    if (!cert) throw new NotFoundException('Certificate not found or invalid');
    return cert;
  }
}
