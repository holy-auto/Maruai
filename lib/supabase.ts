// lib/supabase.ts
// 公開読み取り専用クライアント。RLSで published のみ select 許可している前提なので、
// SSG/ISR のビルド時取得は匿名キーで問題なし（service_role は不要）。
//
// 環境変数が未設定のとき（ローカルのプレビュービルドや Supabase 未接続時）は、
// ネットワークアクセスを行わないスタブを返す。各データ取得関数は空配列/null に
// フォールバックするため、ビルドは失敗しない。本番では .env に値を設定すること。
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function createStubClient(): SupabaseClient {
  const emptyList = { data: [], error: null };
  const emptyOne = { data: null, error: null };
  const notConfigured = { data: null, error: new Error('Supabase is not configured') };

  const chain: Record<string, unknown> = {
    select: () => chain,
    eq: () => chain,
    order: () => chain,
    limit: () => chain,
    maybeSingle: () => Promise.resolve(emptyOne),
    single: () => Promise.resolve(emptyOne),
    insert: () => Promise.resolve(notConfigured),
    // await されたときにリスト結果を返す（thenable）
    then: (resolve: (v: typeof emptyList) => unknown) => resolve(emptyList),
  };

  return { from: () => chain } as unknown as SupabaseClient;
}

export const supabase: SupabaseClient =
  url && key ? createClient(url, key) : createStubClient();
