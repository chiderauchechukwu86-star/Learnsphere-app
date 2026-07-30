import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CertificatesService } from './certificates.service';

@Controller('certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  mine(@CurrentUser() user: any) {
    return this.certificatesService.myCertificates(user.userId);
  }

  // Public — anyone with the ID (e.g. from a QR scan) can verify authenticity.
  @Get('verify/:certificateId')
  verify(@Param('certificateId') certificateId: string) {
    return this.certificatesService.verify(certificateId);
  }
}
