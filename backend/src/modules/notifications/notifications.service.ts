import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument, NotificationType } from './schemas/notification.schema';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
  ) {}

  send(userId: string, type: NotificationType, title: string, body?: string, linkUrl?: string) {
    // In production this also enqueues the email channel (SendGrid/SES) via a worker.
    return this.notificationModel.create({ userId, type, title, body, linkUrl });
  }

  forUser(userId: string, unreadOnly = false) {
    const filter: any = { userId };
    if (unreadOnly) filter.isRead = false;
    return this.notificationModel.find(filter).sort({ createdAt: -1 }).limit(50).exec();
  }

  markRead(id: string) {
    return this.notificationModel.findByIdAndUpdate(id, { isRead: true }, { new: true }).exec();
  }

  markAllRead(userId: string) {
    return this.notificationModel.updateMany({ userId, isRead: false }, { isRead: true }).exec();
  }
}
