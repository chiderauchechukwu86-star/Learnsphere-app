import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Role } from '../../common/enums/role.enum';
import { QuizzesService } from './quizzes.service';

@Controller('quizzes')
@UseGuards(JwtAuthGuard)
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.INSTRUCTOR)
  create(@Body() body: any) {
    return this.quizzesService.create(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizzesService.findById(id);
  }

  @Post(':id/attempts')
  async submit(@CurrentUser() user: any, @Param('id') id: string, @Body('answers') answers: any[]) {
    const quiz = await this.quizzesService.findById(id);
    const attempts = await this.quizzesService.attemptCount(id, user.userId);
    if (attempts >= quiz.maxAttempts) {
      return { error: 'Maximum attempts reached' };
    }
    return this.quizzesService.submitAttempt(id, user.userId, answers);
  }

  @Get(':id/attempts/mine')
  myAttempts(@CurrentUser() user: any, @Param('id') id: string) {
    return this.quizzesService.attemptsForStudent(id, user.userId);
  }
}
