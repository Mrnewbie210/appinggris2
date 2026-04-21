import { supabase } from './supabase';
import { getActiveUser } from './mockAuth';

export async function advanceProgress(
  xpGained: number, 
  isArchive: boolean
): Promise<{ newXp: number, newStreak: number } | null> {
  try {
    console.log("Saving XP... Process started.");
    
    // Absolute User ID Check via getUser
    const { data: { user }, error: authError } = await getActiveUser();
    
    if (authError || !user) {
      console.error("DEBUG: User is truly not logged in.", authError);
      return null;
    }
    
    const userId = user.id;
    console.log("Resolved User Configuration:", userId);

    // Fetch current progress
    const { data: progressRow, error: fetchError } = await supabase
      .from('user_progress')
      .select('xp, streak_days, last_study_date')
      .eq('user_id', userId)
      .maybeSingle();

    if (fetchError) {
      console.error("Progress engine fetch error:", fetchError);
    }

    const todayLocal = new Date();
    // Replaced entirely to prevent Vite build duplicate declaration cache errors
    const currentDateStr = new Date(todayLocal.getTime() - todayLocal.getTimezoneOffset() * 60000).toISOString().split('T')[0];

    const localXP = parseInt(localStorage.getItem(`xp_${userId}`) || '0', 10);
    const localStreak = parseInt(localStorage.getItem(`streak_${userId}`) || '0', 10);
    const localStudyDate = localStorage.getItem(`lastStudy_${userId}`) || currentDateStr;

    // Auto-initialize defaults if missing, taking localStorage heavily into account for dev mode
    const progress = progressRow || {
      xp: localXP,
      streak_days: localStreak,
      last_study_date: localStudyDate
    };

    const lastStudyDateStr = progress.last_study_date || currentDateStr; 
    let newStreak = progress.streak_days || 0;

    if (!isArchive) {
      const msPerDay = 1000 * 60 * 60 * 24;
      const todayMs = new Date(currentDateStr).getTime();
      const lastMs = new Date(lastStudyDateStr).getTime();
      const daysDiff = Math.floor((todayMs - lastMs) / msPerDay);

      if (daysDiff === 1) {
        newStreak += 1;
      } else if (daysDiff > 1) {
        newStreak = 1;
      } else if (daysDiff === 0 && newStreak === 0) {
        newStreak = 1;
      }
    }

    const finalXpGain = isArchive ? Math.floor(xpGained * 0.5) : xpGained;
    const newXp = (progress.xp || 0) + finalXpGain;
    console.log(`Calculated Game Data -> XP: +${finalXpGain} (Total: ${newXp}), Streak: ${newStreak}`);

    try {
      const { error: upsertError } = await supabase
        .from('user_progress')
        .update({
           xp: newXp,
           streak_days: newStreak,
           last_study_date: new Date().toISOString()
        }).eq('user_id', userId);

      if (upsertError) {
        console.warn("Progress sync failed (check RLS):", upsertError.message);
      } else {
        console.log("XP SUCCESS: Supabase Update completed smoothly!");
      }
    } catch (e) {
      console.warn("Progress sync exception handled:", e);
    }

    // Always mirror to localStorage so the UI remains reliable across refreshes even if Supabase triggers 401
    try {
       localStorage.setItem(`xp_${userId}`, newXp.toString());
       localStorage.setItem(`streak_${userId}`, newStreak.toString());
       localStorage.setItem(`lastStudy_${userId}`, new Date().toISOString());
    } catch(e) {}

    return { newXp, newStreak };
  } catch (err) {
    console.error('Failed to advance progress:', err);
    return null;
  }
}
