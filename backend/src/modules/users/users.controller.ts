import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Role } from '../../common/enums/role.enum';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  me(@CurrentUser() user: any) {
    return this.usersService.findById(user.userId);
  }

  @Patch('me')
  updateMe(@CurrentUser() user: any, @Body() body: any) {
    return this.usersService.update(user.userId, body);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id/approve-instructor')
  @Roles(Role.ADMIN)
  approveInstructor(@Param('id') id: string) {
    return this.usersService.approveInstructor(id);
  }
}
