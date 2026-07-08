import { Controller, Post, Body, UseGuards, BadRequestException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminGuard } from '../auth/auth.guard';

@Controller('v1/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('sync-index')
  @UseGuards(AdminGuard)
  async syncIndex(
    @Body() body: { indexCode: string; indexSymbol: string; name?: string },
  ) {
    if (!body.indexCode || !body.indexSymbol) {
      throw new BadRequestException('indexCode and indexSymbol are required');
    }
    return this.adminService.syncIndex(body.indexCode, body.indexSymbol, body.name);
  }
}
