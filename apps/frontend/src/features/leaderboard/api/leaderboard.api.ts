import { LeaderboardEntry } from '@tma-game/shared-types';
import { http } from '../../../shared/api/http';

export const fetchLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  const { data } = await http.get<LeaderboardEntry[]>('/game/leaderboard');
  return data;
};
