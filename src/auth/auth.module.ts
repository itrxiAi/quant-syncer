import { Module } from '@nestjs/common';
import { AuthGuard, AdminGuard } from './auth.guard';

@Module({
  providers: [AuthGuard, AdminGuard],
  exports: [AuthGuard, AdminGuard],
})
export class AuthModule {}
