import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotUpdate } from './bot.update';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: require('path').resolve(__dirname, '../../../../.env'),
    }),
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        token: config.get<string>('TELEGRAM_BOT_TOKEN') ?? '',
      }),
    }),
  ],
  providers: [BotUpdate],
})
export class AppModule {}
