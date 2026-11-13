// lib/examples.ts
// 施工事例（Example）の型定義。データ本体は Supabase の works テーブルから取得し、
// lib/content.ts の workToExample() で この形状にマッピングする。
// （以前はこのファイルにモック配列を直書きしていたが、Supabase 連携に統一した。）

export type Example = {
  id: string;
  category: string;
  title: string;
  location: string;
  area: string;
  period: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  features: string[];
  testimonial: string;
};

// フィルタ UI 用のカテゴリ既定リスト（works にデータが無い場合のフォールバック）。
// 通常は works から実在カテゴリを集計して使う（app/works/page.tsx 参照）。
export const exampleCategories = [
  "すべて",
  "外壁塗装",
  "屋根塗装",
  "コーキング・外壁塗装",
  "防水工事・外壁塗装",
  "外壁・屋根塗装",
  "屋根塗装・コーキング",
  "外壁塗装・防水工事",
];
