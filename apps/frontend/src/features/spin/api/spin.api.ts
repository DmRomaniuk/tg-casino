import { SpinResult } from '@tma-game/shared-types';
import { http } from '../../../shared/api/http';

export interface SpinResponse {
  result: SpinResult;
  newBalance: number;
}

export const spin = async (betAmount: number): Promise<SpinResponse> => {
  const { data } = await http.post<SpinResponse>('/game/spin', { betAmount });
  return data;
};
