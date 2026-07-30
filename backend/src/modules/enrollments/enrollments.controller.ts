import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { EnrollmentsService } from './enrollments.service';

@Controller('enrollments')
@UseGuards(JwtAuthGuard)
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post(':courseId')
  enroll(@CurrentUser() user: any, @Param('courseId') courseId: string) {
    return this.enrollmentsService.enroll(user.userId, courseId);
  }

  @Get()
  mine(@CurrentUser() user: any) {
    return this.enrollmentsService.myEnrollments(user.userId);
  }

  @Get(':courseId')
  findOne(@CurrentUser() user: any, @Param('courseId') courseId: string) {
    return this.enrollmentsService.findOne(user.userId, courseId);
  }

  @Post(':courseId/lessons/:lessonId/complete')
  completeLesson(
    @CurrentUser() user: any,
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
    @Body('totalLessons') totalLessons: number,
  ) {
    return this.enrollmentsService.markLessonComplete(user.userId, courseId, lessonId, totalLessons);
  }
}
