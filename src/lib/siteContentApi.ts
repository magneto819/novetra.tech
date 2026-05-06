import { defaultSiteContent, mergeSiteContent } from '../content/siteContent';
import type { SiteContent } from '../content/siteContent';

export const ADMIN_EMAIL = 'magneto.zhao@gmail.com';
export const ADMIN_USERNAME = 'admin123';

const SUPABASE_URL = trimTrailingSlash(import.meta.env.VITE_SUPABASE_URL);
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const CONTENT_ROW_ID = 'home';
const SESSION_STORAGE_KEY = 'novetra-admin-session';

export type AdminSession = {
  accessToken: string;
  refreshToken: string;
  expiresAt?: number;
  email: string;
};

type SupabaseContentRow = {
  data: unknown;
};

type SupabaseAuthResponse = {
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
  user?: {
    email?: string;
  };
  error_description?: string;
  msg?: string;
};

export function hasSupabaseConfig() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

export async function fetchSiteContent(): Promise<SiteContent> {
  if (!hasSupabaseConfig()) {
    return defaultSiteContent;
  }

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/site_content?id=eq.${CONTENT_ROW_ID}&select=data`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    },
  );

  if (!res.ok) {
    return defaultSiteContent;
  }

  const rows = (await res.json()) as SupabaseContentRow[];
  return mergeSiteContent(rows[0]?.data);
}

export async function signInAdmin(email: string, password: string): Promise<AdminSession> {
  requireSupabaseConfig();

  const normalizedEmail = email === ADMIN_USERNAME ? ADMIN_EMAIL : email;

  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: normalizedEmail, password }),
  });

  const data = (await res.json()) as SupabaseAuthResponse;

  if (!res.ok || !data.access_token || !data.refresh_token) {
    throw new Error(data.error_description || data.msg || '登录失败，请检查账号或密码。');
  }

  const userEmail = data.user?.email || normalizedEmail;

  if (userEmail.toLowerCase() !== ADMIN_EMAIL) {
    throw new Error('当前账号没有后台管理权限。');
  }

  const session: AdminSession = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: data.expires_at,
    email: userEmail,
  };

  storeAdminSession(session);
  return session;
}

export async function saveSiteContent(content: SiteContent, session: AdminSession): Promise<SiteContent> {
  requireSupabaseConfig();

  const res = await fetch(`${SUPABASE_URL}/rest/v1/site_content`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=representation',
    },
    body: JSON.stringify({
      id: CONTENT_ROW_ID,
      data: content,
    }),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || '保存失败，请稍后重试。');
  }

  const rows = (await res.json()) as SupabaseContentRow[];
  return mergeSiteContent(rows[0]?.data);
}

export function getStoredAdminSession(): AdminSession | null {
  const raw = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AdminSession;
  } catch {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    return null;
  }
}

export function storeAdminSession(session: AdminSession) {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearAdminSession() {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

function requireSupabaseConfig() {
  if (!hasSupabaseConfig()) {
    throw new Error('缺少 VITE_SUPABASE_URL 或 VITE_SUPABASE_ANON_KEY，后台暂时不可用。');
  }
}

function trimTrailingSlash(value: string | undefined) {
  return value?.replace(/\/+$/, '') || '';
}
