import {
  hapticFeedbackImpactOccurred,
  hapticFeedbackNotificationOccurred,
  isHapticFeedbackSupported,
} from '@telegram-apps/sdk';

export type HapticImpact = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft';
export type HapticNotification = 'success' | 'warning' | 'error';

export const triggerImpact = (style: HapticImpact) => {
  try {
    if (isHapticFeedbackSupported()) {
      hapticFeedbackImpactOccurred(style);
    }
  } catch {
    return;
  }
};

export const triggerNotification = (type: HapticNotification) => {
  try {
    if (isHapticFeedbackSupported()) {
      hapticFeedbackNotificationOccurred(type);
    }
  } catch {
    return;
  }
};
