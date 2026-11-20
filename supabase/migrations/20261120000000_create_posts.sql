-- コラム（posts）テーブル — Maruai プロジェクト用
-- Supabase の SQL Editor に貼り付けて実行しても、そのまま動きます。
--
-- 方針:
--  * published の既定は false（下書き）。書き上げて確認したものだけ true にする。
--  * published_at を未来の日時にすると、その日時になるまでサイトに出ない（予約公開）。
--  * 匿名（サイト訪問者）は公開済みの行だけ読める。書き込みは不可（Supabase の管理画面から入力する）。
--
-- 本文（body）の書き方:
--  * 空行で段落を分ける
--  * 「## 」で始まる行は小見出し
--  * 「・」または「- 」で始まる行が続くと箇条書き

create table if not exists public.posts (
  slug         text primary key check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),  -- URL になる部分。例: gaiheki-jiki
  title        text        not null,
  excerpt      text,        -- 一覧と記事の冒頭に出す要約（1〜2文）
  body         text,
  published    boolean     not null default false,
  published_at timestamptz not null default now(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

comment on table public.posts is 'Maruai お役立ちコラム。published=true かつ published_at が過去のものだけ公開。';
comment on column public.posts.slug is 'URL（/blog/◯◯）になる英小文字・数字・ハイフン';
comment on column public.posts.published is '書き上げて確認してから true にする';
comment on column public.posts.published_at is '公開日。未来の日時にすると予約公開';

create index if not exists posts_published_at_idx on public.posts (published_at desc);

-- 更新日時を自動で入れる
create or replace function public.posts_set_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.posts_set_updated_at();

alter table public.posts enable row level security;

drop policy if exists "public can read published posts" on public.posts;
create policy "public can read published posts"
  on public.posts for select
  to anon, authenticated
  using (published = true and published_at <= now());
