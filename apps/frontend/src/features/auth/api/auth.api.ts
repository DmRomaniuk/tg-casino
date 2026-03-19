import { http } from '../../../shared/api/http';
import { AuthResponse } from './auth.types';

export const authenticate = async (initData: string): Promise<AuthResponse> => {
  const { data } = await http.post<AuthResponse>('/auth', { initData });
  return data;
};
