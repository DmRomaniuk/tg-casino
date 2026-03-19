import { Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { ConfigService } from '@nestjs/config';

@Update()
export class BotUpdate {
  constructor(private readonly config: ConfigService) {}

  @Start()
  async onStart(ctx: Context) {
    const webAppUrl = this.config.getOrThrow<string>('WEBAPP_URL');

    await ctx.setChatMenuButton({
      type: 'web_app',
      text: '🎮 Грати',
      web_app: { url: webAppUrl },
    });

    await ctx.reply('Привіт! 👋 Натисни кнопку "Грати" внизу щоб розпочати!');
  }
}
