import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Role } from '../../common/enums/role.enum';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('course/:courseId')
  forCourse(@Param('courseId') courseId: string, @Query('page') page: number) {
    return this.reviewsService.forCourse(courseId, page);
  }

  @Post('course/:courseId')
  @UseGuards(JwtAuthGuard)
  create(
    @CurrentUser() user: any,
    @Param('courseId') courseId: string,
    @Body() body: { rating: number; comment?: string },
  ) {
    return this.reviewsService.create(user.userId, courseId, body.rating, body.comment);
  }

  @Patch(':id/reply')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  reply(@Param('id') id: string, @Body('message') message: string) {
    return this.reviewsService.reply(id, message);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string, @Body('courseId') courseId: string) {
    return this.reviewsService.delete(id, courseId);
  }
}
