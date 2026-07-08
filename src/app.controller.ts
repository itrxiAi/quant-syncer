import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { join } from 'path';
import { readFileSync } from 'fs';

@Controller()
export class AppController {
  constructor(private prisma: PrismaService) {}

  @Get('health')
  async health() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Get('ui')
  ui() {
    const html = readFileSync(join(__dirname, '..', 'static', 'index.html'), 'utf-8');
    return html;
  }
}
