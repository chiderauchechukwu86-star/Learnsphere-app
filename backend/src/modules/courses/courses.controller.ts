import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Role } from '../../common/enums/role.enum';
import { CoursesService, CourseSearchQuery } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // ---- Public: search & discovery ----
  @Get()
  search(@Query() query: CourseSearchQuery) {
    return this.coursesService.search(query);
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.coursesService.findBySlug(slug);
  }

  // ---- Instructor ----
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  create(@CurrentUser() user: any, @Body() body: any) {
    return this.coursesService.create(user.userId, body);
  }

  @Get('mine/list')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  myCourses(@CurrentUser() user: any) {
    return this.coursesService.findByInstructor(user.userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  update(@Param('id') id: string, @Body() body: any) {
    return this.coursesService.update(id, body);
  }

  @Patch(':id/submit')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR)
  submit(@Param('id') id: string) {
    return this.coursesService.submitForReview(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.INSTRUCTOR, Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.coursesService.delete(id);
  }

  // ---- Admin: moderation ----
  @Patch(':id/moderate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  moderate(@Param('id') id: string, @Body('status') status: 'published' | 'rejected') {
    return this.coursesService.moderate(id, status);
  }
}
