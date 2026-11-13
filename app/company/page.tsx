import type { Metadata } from 'next';
import { PageHero } from '@/components/site/PageHero';

export const metadata: Metadata = {
  title: '会社概要',
  description: '株式会社 丸愛装業の会社概要・代表挨拶。茨城県稲敷郡阿見町。完全自社施工で外壁塗装・屋根塗装を行います。',
  alternates: { canonical: '/company' },
};

const CORP: [string, React.ReactNode][] = [
  ['社名', '株式会社 丸愛装業'],
  ['代表者', '代表取締役　小林 力也'],
  ['所在地', '〒300-0325　茨城県稲敷郡阿見町上条888'],
  ['電話 / FAX', '029-886-7913 ／ FAX 029-886-5499'],
  ['受付時間', '平日 9:00〜18:00'],
  ['施工内容', '外壁塗装・屋根塗装・コーキング・防水工事'],
  ['対応エリア', '阿見町・牛久市・土浦市・つくば市・取手市・龍ケ崎市（60分圏内）'],
  ['所属', '一般社団法人 全国優良リフォーム 会員'],
];

// 代表の写真。用意できたら public/images/ に置いてパスを入れると、プロフィール枠の代わりに写真を表示する。
// 例: const REP_PHOTO: string | null = '/images/representative.jpg';
const REP_PHOTO: string | null = null;

// 写真がない間に表示する、代表の約束ごと（旧公式サイトに記載の内容）
const REP_POINTS = [
  { icon: 'ri-team-line', text: '営業・下請けのいない完全自社施工' },
  { icon: 'ri-user-star-line', text: 'ご相談からアフターフォローまで代表が担当' },
  { icon: 'ri-map-pin-time-line', text: 'すぐ駆けつけられる60分圏内に限定して施工' },
];

// 構成：Banner → 代表挨拶（Split：プロフィールの板 5列 ＋ 挨拶文 6列）→ 会社概要（見出し 1〜4列 ＋ 表 5〜12列）
export default function CompanyPage() {
  return (
    <main className="relative">
      <PageHero
        title="会社概要"
        description="街の塗装屋さんから、知り合いの塗装屋さんへ。最高の仕上がりを、適正価格で。"
      />

      {/* 代表挨拶 */}
      <section className="bg-paper pt-[var(--space-lg)] pb-[calc(var(--section-gap)/2)]">
        <div className="container">
          <h2 className="max-w-none">代表挨拶</h2>

          <div className="mt-[var(--space-2xl)] grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12 items-start">
            {REP_PHOTO ? (
              <figure
                className="photo md:col-span-5 m-0 aspect-[4/5]"
                data-slot="representative"
              >
                <img
                  src={REP_PHOTO}
                  alt="株式会社 丸愛装業 代表取締役 小林 力也"
                  width={800}
                  height={1000}
                />
              </figure>
            ) : (
              <div className="plate md:col-span-5 p-6 md:p-8">
                <p className="label">代表取締役</p>
                <p className="mt-1 font-display font-bold text-[length:var(--text-3xl)] leading-tight text-ink [font-feature-settings:'palt']">
                  小林 力也
                </p>
                <ul className="mt-6 border-t-hair border-paper-3 divide-y divide-paper-3">
                  {REP_POINTS.map((p) => (
                    <li key={p.text} className="flex items-start gap-3 py-4 text-base text-ink">
                      <i className={`${p.icon} text-xl leading-[1.75] text-ink`} aria-hidden="true"></i>
                      <span>{p.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="md:col-span-6 md:col-start-7">
              <p className="font-display font-bold text-[length:var(--text-2xl)] leading-[1.4] text-ink [font-feature-settings:'palt']">
                「期待しているよ」
                <br />
                その言葉に、
                <br />
                真っ直ぐ応えたくて。
              </p>
              <div className="mt-8 space-y-5 text-base text-ink-2 max-w-[38em]">
                <p>100万円を貯めるのに、3年、5年とかかる方も少なくありません。その大切なお金で行う外壁塗装が、本当に信頼できる業者に任せられているか。私はそこを一番に考えています。</p>
                <p>営業会社が請けた工事では、職人に渡る材料費や工賃が削られ、どう頑張っても良い仕事ができない。その悔しさが、独立の原点です。小さな会社だからこそ、一件一件に真心を込めて対応します。</p>
              </div>
              <p className="mt-8 pt-5 border-t-hair border-paper-3 text-base text-ink-2">
                株式会社 丸愛装業　代表取締役　<b className="font-display font-bold text-ink">小林 力也</b>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 会社概要：見出しを左に、表（dl）を右に。上端に墨の太線、行の間は細線 */}
      <section className="bg-paper py-[calc(var(--section-gap-l)/2)]">
        <div className="container">
          <div className="rule-bar grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8 pt-[var(--space-xl)]">
            <h2 className="md:col-span-4">会社概要</h2>
            <dl className="md:col-span-8 divide-y divide-paper-3 border-b-hair border-paper-3">
              {CORP.map(([k, v]) => (
                <div key={String(k)} className="grid grid-cols-1 sm:grid-cols-8 gap-x-8 gap-y-1 py-4 md:py-5">
                  <dt className="sm:col-span-2 text-base font-bold text-ink">{k}</dt>
                  <dd className="sm:col-span-6 text-base text-ink-2 tabular-nums">{v}</dd>
                </div>
              ))}
              <div className="grid grid-cols-1 sm:grid-cols-8 gap-x-8 gap-y-1 py-4 md:py-5">
                <dt className="sm:col-span-2 text-base font-bold text-ink">公式SNS</dt>
                <dd className="sm:col-span-6 text-base text-ink-2">
                  <a href="https://line.me/ti/p/UxXZqXMSWE" className="link">公式LINE</a>
                  <span className="mx-2 text-ink-2" aria-hidden="true">／</span>
                  <a href="https://www.instagram.com/maruaisougyou" className="link">Instagram @maruaisougyou</a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}
