import { useLaunchParams, useRawInitData } from '@telegram-apps/sdk-react';
import { TelegramUserWithPhoto } from './useTelegramUser.types';

export function useTelegramUser() {
  const launchParams = useLaunchParams();
  const initDataRaw = useRawInitData();

  const user: TelegramUserWithPhoto | null = launchParams?.tgWebAppData?.user
    ? {
        id: launchParams.tgWebAppData.user.id,
        firstName: launchParams.tgWebAppData.user.first_name,
        lastName: launchParams.tgWebAppData.user.last_name,
        username: launchParams.tgWebAppData.user.username,
        photoUrl: launchParams.tgWebAppData.user.photo_url,
        languageCode: launchParams.tgWebAppData.user.language_code,
      }
    : null;

  return { user, initDataRaw };
}
