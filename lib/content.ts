// lib/content.ts
import { supabase } from './supabase';
import type { Example } from './examples';

export type City = {
  slug: string;
  name: string;
  intro: string;
  climate_note: string | null;
  nearby: string[];
};

// works テーブル（施工事例）。新デザイン（Example）で使う列を主とし、
// region ページ（RegionPage）が参照する旧スキーマ列は任意として互換を保つ。
export type Work = {
  id: number;
  created_at?: string;
  published?: boolean;
  sort?: number;
  category: string;
  title: string;
  location: string;
  area: string;
  period: string;
  description: string;
  before_url: string | null;
  after_url: string | null;
  features: string[];
  testimonial: string;
  // --- 旧スキーマ互換（存在しない環境では undefined になる） ---
  city_slug?: string | null;
  service?: string;
  paint?: string | null;
  built_years?: number | null;
  body?: string | null;
};

// Work 行を、施工事例コンポーネントが扱う Example 形状に変換する。
export function workToExample(w: Work): Example {
  return {
    id: String(w.id),
    category: w.category ?? '',
    title: w.title,
    location: w.location ?? '',
    area: w.area ?? '',
    period: w.period ?? '',
    description: w.description ?? '',
    beforeImage: w.before_url ?? '',
    afterImage: w.after_url ?? '',
    features: w.features ?? [],
    testimonial: w.testimonial ?? '',
  };
}

export type Voice = {
  id: number;
  city_slug: string | null;
  rating: number;
  headline: string | null;
  body: string | null;
  who: string | null;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string | null;
  body: string | null;
  published_at: string;
};

/* ---------- cities ---------- */
export async function getCities(): Promise<City[]> {
  const { data, error } = await supabase.from('cities').select('*').order('sort');
  if (error) throw error;
  return data ?? [];
}
export async function getCity(slug: string): Promise<City | null> {
  const { data } = await supabase.from('cities').select('*').eq('slug', slug).maybeSingle();
  return data ?? null;
}

/* ---------- works ---------- */
export async function getWorksByCity(slug: string, service?: string): Promise<Work[]> {
  let q = supabase.from('works').select('*').eq('city_slug', slug);
  if (service) q = q.eq('service', service);
  const { data } = await q.order('created_at', { ascending: false });
  return data ?? [];
}
export async function getRecentWorks(limit = 6): Promise<Work[]> {
  const { data } = await supabase
    .from('works')
    .select('*')
    .order('sort', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(limit);
  return data ?? [];
}
// 施工事例一覧（公開分すべて）。RLS で published のみ返る。
export async function getWorks(): Promise<Work[]> {
  const { data } = await supabase
    .from('works')
    .select('*')
    .order('sort', { ascending: true })
    .order('created_at', { ascending: false });
  return data ?? [];
}
export async function getWork(id: number): Promise<Work | null> {
  const { data } = await supabase.from('works').select('*').eq('id', id).maybeSingle();
  return data ?? null;
}
export async function getAllWorkIds(): Promise<number[]> {
  const { data } = await supabase.from('works').select('id');
  return (data ?? []).map((w) => w.id as number);
}

/* ---------- voices ---------- */
export async function getVoicesByCity(slug: string): Promise<Voice[]> {
  const { data } = await supabase.from('voices').select('*').eq('city_slug', slug);
  return data ?? [];
}
export async function getAllVoices(): Promise<Voice[]> {
  const { data } = await supabase.from('voices').select('*').order('created_at', { ascending: false });
  return data ?? [];
}

/* ---------- posts ---------- */
export async function getPosts(): Promise<Post[]> {
  const { data } = await supabase.from('posts').select('*').order('published_at', { ascending: false });
  return data ?? [];
}
export async function getPost(slug: string): Promise<Post | null> {
  const { data } = await supabase.from('posts').select('*').eq('slug', slug).maybeSingle();
  return data ?? null;
}
export async function getPostSlugs(): Promise<string[]> {
  const { data } = await supabase.from('posts').select('slug');
  return (data ?? []).map((p) => p.slug as string);
}
