import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { calculateBMI, getBMICategory } from '@/lib/bmi';
import type { BMIEntry, BMIInput } from '@/types';

export function useBmiEntries(userId: string | null) {
  const [entries, setEntries] = useState<BMIEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    if (!userId) {
      setEntries([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await supabase
      .from('bmi_entries')
      .select('*')
      .order('recorded_date', { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setEntries(data as BMIEntry[]);
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const addEntry = useCallback(async (input: BMIInput): Promise<BMIEntry | null> => {
    if (!userId) return null;
    const bmi_value = calculateBMI(input.height_cm, input.weight_kg);
    const category = getBMICategory(bmi_value);

    const { data, error: insertError } = await supabase
      .from('bmi_entries')
      .insert({
        height_cm: input.height_cm,
        weight_kg: input.weight_kg,
        bmi_value,
        category,
        recorded_date: input.recorded_date,
        note: input.note ?? null,
      })
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
      return null;
    }

    const newEntry = data as BMIEntry;
    setEntries((prev) => [...prev, newEntry].sort((a, b) =>
      new Date(a.recorded_date).getTime() - new Date(b.recorded_date).getTime()
    ));
    return newEntry;
  }, [userId]);

  const deleteEntry = useCallback(async (id: string): Promise<boolean> => {
    const { error: deleteError } = await supabase
      .from('bmi_entries')
      .delete()
      .eq('id', id);

    if (deleteError) {
      setError(deleteError.message);
      return false;
    }

    setEntries((prev) => prev.filter((e) => e.id !== id));
    return true;
  }, []);

  const clearAll = useCallback(async (): Promise<boolean> => {
    const { error: clearError } = await supabase
      .from('bmi_entries')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (clearError) {
      setError(clearError.message);
      return false;
    }

    setEntries([]);
    return true;
  }, []);

  return { entries, loading, error, addEntry, deleteEntry, clearAll, refetch: fetchEntries };
}
