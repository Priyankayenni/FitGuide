import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Challenge, UserChallenge } from '@/types';

export function useChallenges(userId: string | null) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [userChallenges, setUserChallenges] = useState<UserChallenge[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChallenges = useCallback(async () => {
    const { data: chData } = await supabase.from('challenges').select('*');
    if (chData) setChallenges(chData as Challenge[]);

    if (userId) {
      const { data: ucData } = await supabase
        .from('user_challenges')
        .select('*, challenge:challenges(*)')
        .eq('user_id', userId);
      if (ucData) setUserChallenges(ucData as UserChallenge[]);
    } else {
      setUserChallenges([]);
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  const joinChallenge = useCallback(async (challengeId: string): Promise<boolean> => {
    if (!userId) return false;
    const { data, error } = await supabase
      .from('user_challenges')
      .insert({ user_id: userId, challenge_id: challengeId })
      .select('*, challenge:challenges(*)')
      .single();

    if (error) return false;
    if (data) setUserChallenges((prev) => [...prev, data as UserChallenge]);
    return true;
  }, [userId]);

  const updateProgress = useCallback(async (userChallengeId: string, progress: number, target: number): Promise<boolean> => {
    const isComplete = progress >= target;
    const { data, error } = await supabase
      .from('user_challenges')
      .update({
        progress,
        status: isComplete ? 'completed' : 'active',
        completed_at: isComplete ? new Date().toISOString() : null,
      })
      .eq('id', userChallengeId)
      .select('*, challenge:challenges(*)')
      .single();

    if (error) return false;
    if (data) {
      setUserChallenges((prev) => prev.map((uc) => (uc.id === userChallengeId ? data as UserChallenge : uc)));
    }
    return true;
  }, []);

  const leaveChallenge = useCallback(async (userChallengeId: string): Promise<boolean> => {
    const { error } = await supabase
      .from('user_challenges')
      .delete()
      .eq('id', userChallengeId);

    if (error) return false;
    setUserChallenges((prev) => prev.filter((uc) => uc.id !== userChallengeId));
    return true;
  }, []);

  return { challenges, userChallenges, loading, joinChallenge, updateProgress, leaveChallenge, refetch: fetchChallenges };
}
