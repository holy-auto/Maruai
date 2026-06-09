-- =====================================================================
--  丸愛装業サイト：DBスキーマ（Supabase / Postgres）
--  SupabaseのSQL Editorに貼って実行 → そのまま動きます。
-- =====================================================================

create table if not exists cities (
  slug text primary key, name text not null,
  intro text not null, climate_note text,
  nearby text[] default '{}', sort int default 0
);

create table if not exists works (
  id bigint generated always as identity primary key,
  city_slug text references cities(slug),
  title text not null, service text not null,
  paint text, built_years int,
  before_url text, after_url text, body text,
  published boolean default true, created_at timestamptz default now()
);

create table if not exists voices (
  id bigint generated always as identity primary key,
  city_slug text references cities(slug),
  rating int default 5, headline text, body text, who text,
  published boolean default true, created_at timestamptz default now()
);

create table if not exists posts (
  slug text primary key, title text not null,
  excerpt text, body text,
  published boolean default true, published_at timestamptz default now()
);

-- お問い合わせ（フォーム送信先）
create table if not exists inquiries (
  id bigint generated always as identity primary key,
  name text not null, email text, tel text, body text,
  created_at timestamptz default now()
);

-- ---------- RLS：公開ページは read のみ、問い合わせは insert のみ ----------
alter table cities    enable row level security;
alter table works     enable row level security;
alter table voices    enable row level security;
alter table posts     enable row level security;
alter table inquiries enable row level security;

create policy "read cities"  on cities  for select using (true);
create policy "read works"   on works   for select using (published);
create policy "read voices"  on voices  for select using (published);
create policy "read posts"   on posts   for select using (published);
create policy "insert inq"   on inquiries for insert with check (true);
-- inquiries は select ポリシーを作らない＝匿名では読めない（管理はダッシュボード/service_role）

-- ---------- シード：6市町（阿見は実記述。他は要差し替え） ----------
insert into cities (slug, name, intro, climate_note, nearby, sort) values
('ami','阿見町',
 '阿見町は丸愛装業の本拠地です。地元のお家だからこそ、ご相談から施工後のアフターフォローまで代表の職人が責任を持って対応します。築7〜10年を過ぎると外壁の防水機能が落ち始め、色あせやチョーキング（白い粉）が出てきます。気になるサインがあれば、まずは無料診断にお呼びください。',
 '霞ヶ浦からの湿気を含む風と夏の強い日射しは、外壁の色あせや北面のコケ・カビを早める傾向があります。',
 '{ushiku,tsuchiura}',1),
('ushiku','牛久市','［牛久市向けの導入文をここに（200〜400字・要差し替え）。市名だけ差し替えのコピペにしないこと。］','［牛久市の気候・立地メモ（任意）］','{ami,tsuchiura,ryugasaki}',2),
('tsuchiura','土浦市','［土浦市向けの導入文（要差し替え）。］',null,'{ami,tsukuba,ushiku}',3),
('tsukuba','つくば市','［つくば市向けの導入文（要差し替え）。］',null,'{tsuchiura,ushiku}',4),
('toride','取手市','［取手市向けの導入文（要差し替え）。］',null,'{ryugasaki}',5),
('ryugasaki','龍ケ崎市','［龍ケ崎市向けの導入文（要差し替え）。］',null,'{ushiku,toride}',6)
on conflict (slug) do nothing;

insert into works (city_slug,title,service,paint,built_years,body) values
('ami','阿見町 S様邸 外壁塗装','外壁塗装','シリコン',12,'［施工内容・課題・仕上がりを差し替え］'),
('ami','阿見町 K様邸 屋根＋外壁','屋根塗装','フッ素',15,'［差し替え］');

insert into voices (city_slug,rating,headline,body,who) values
('ami',5,'［ひとことの見出し］','［お客様の声を差し替え（掲載許可を得てから）］','阿見町・60代・外壁塗装');

insert into posts (slug,title,excerpt,body) values
('gaiheki-jiki','外壁塗装の「やるべき時期」の見分け方','チョーキング・色あせ・ひび割れ…塗り替えのサインを職人が解説。','［本文を差し替え］'),
('kasai-hoken','火災保険で外壁塗装はできる？','風災補償の対象になるケースと、診断の流れを解説します。','［本文を差し替え］');
