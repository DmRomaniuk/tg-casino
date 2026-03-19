import { User } from '@tma-game/shared-types';

export interface AuthResponse {
  token: string;
  user: User;
}
