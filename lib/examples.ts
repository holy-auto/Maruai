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

// 生成画像（readdy.ai の検索画像など）は施工写真として表示しない。自社の写真の URL だけを「本物」とみなす
export function isRealPhoto(url: string | undefined | null): url is string {
  if (!url) return false;
  return !/readdy\.ai|readdy-site\.link/.test(url);
}

// 「2025年10月（8日間）」→ { ym: "2025.10", days: "8日間" }
export function parsePeriod(period: string): { ym: string; days: string } {
  const m = period.match(/(\d{4})年\s*(\d{1,2})月/);
  const d = period.match(/（([^）]+)）/);
  return { ym: m ? `${m[1]}.${m[2].padStart(2, "0")}` : period, days: d ? d[1] : "" };
}

// 「茨城県阿見町」→ "阿見町"（地図の市町村名に合わせ、ヶ は ケ にそろえる）
export function cityOf(location: string): string {
  return location.replace(/^茨城県/, "").replace(/ヶ/g, "ケ").trim();
}
