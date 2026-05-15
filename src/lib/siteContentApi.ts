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

export type SaveSiteContentResult = {
  content: SiteContent;
  session: AdminSession;
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

const TOKEN_REFRESH_BUFFER_SECONDS = 60;

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

export async function refreshAdminSession(session: AdminSession): Promise<AdminSession> {
  requireSupabaseConfig();

  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: session.refreshToken }),
  });

  const data = (await res.json()) as SupabaseAuthResponse;

  if (!res.ok || !data.access_token || !data.refresh_token) {
    throw new Error(data.error_description || data.msg || '登录已过期，请重新登录。');
  }

  const userEmail = data.user?.email || session.email;

  if (userEmail.toLowerCase() !== ADMIN_EMAIL) {
    throw new Error('当前账号没有后台管理权限。');
  }

  const nextSession: AdminSession = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: data.expires_at,
    email: userEmail,
  };

  storeAdminSession(nextSession);
  return nextSession;
}

export async function saveSiteContent(
  content: SiteContent,
  session: AdminSession,
): Promise<SaveSiteContentResult> {
  requireSupabaseConfig();

  let activeSession = await ensureFreshSession(session);
  let res = await upsertSiteContent(content, activeSession);
  let responseText = await res.text();

  if (!res.ok && isExpiredJwtResponse(responseText)) {
    activeSession = await refreshAdminSession(activeSession);
    res = await upsertSiteContent(content, activeSession);
    responseText = await res.text();
  }

  if (!res.ok) {
    throw new Error(responseText || '保存失败，请稍后重试。');
  }

  const rows = parseContentRows(responseText);
  return {
    content: mergeSiteContent(rows[0]?.data),
    session: activeSession,
  };
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

async function ensureFreshSession(session: AdminSession) {
  if (!session.expiresAt) {
    return session;
  }

  const expiresIn = session.expiresAt - Math.floor(Date.now() / 1000);

  if (expiresIn > TOKEN_REFRESH_BUFFER_SECONDS) {
    return session;
  }

  return refreshAdminSession(session);
}

function upsertSiteContent(content: SiteContent, session: AdminSession) {
  return fetch(`${SUPABASE_URL}/rest/v1/site_content`, {
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
}

function parseContentRows(responseText: string) {
  try {
    return JSON.parse(responseText) as SupabaseContentRow[];
  } catch {
    return [];
  }
}

function isExpiredJwtResponse(responseText: string) {
  const normalized = responseText.toLowerCase();
  return normalized.includes('jwt expired') || normalized.includes('pgrst303');
}
