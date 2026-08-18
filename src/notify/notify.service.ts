import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NotifyService {
  private readonly logger = new Logger(NotifyService.name);
  private readonly token = process.env.TELEGRAM_BOT_TOKEN;
  private readonly chatId = process.env.TELEGRAM_CHAT_ID;

  async sendTg(message: string): Promise<void> {
    if (!this.token || !this.chatId) {
      this.logger.warn('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set, skip TG notification');
      return;
    }
    try {
      await axios.post(
        `https://api.telegram.org/bot${this.token}/sendMessage`,
        { chat_id: this.chatId, text: message, parse_mode: 'Markdown' },
        { timeout: 10000, proxy: false },
      );
      this.logger.log('TG notification sent');
    } catch (e) {
      this.logger.error(`TG notification failed: ${e}`);
    }
  }
}
