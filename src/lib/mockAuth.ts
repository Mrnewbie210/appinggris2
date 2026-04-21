import { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabase';

export const MOCK_USER_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

export const mockUser: User = {
  id: MOCK_USER_ID,
  app_metadata: {},
  user_metadata: { full_name: 'Admin Developer Bypass' },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
  email: 'bypass@local.dev',
};

export const mockSession: Session = {
  access_token: 'mock-jwt-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  token_type: 'bearer',
  user: mockUser,
};

export function isAuthBypassEnabled() {
  return import.meta.env.VITE_AUTH_BYPASS === 'true';
}

export async function getActiveUser() {
  if (isAuthBypassEnabled()) {
    console.warn("🛡️ MOCK AUTH BYPASS ENABLED: Returning injected development user.");
    return { data: { user: mockUser }, error: null };
  }
  return await supabase.auth.getUser();
}

export async function getActiveSession() {
  if (isAuthBypassEnabled()) {
    return { data: { session: mockSession }, error: null };
  }
  return await supabase.auth.getSession();
}
