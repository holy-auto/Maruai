// lib/supabase.ts
// 公開読み取り専用クライアント。RLSで published のみ select 許可している前提なので、
// SSG/ISR のビルド時取得は匿名キーで問題なし（service_role は不要）。
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
