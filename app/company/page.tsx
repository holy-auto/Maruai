import type { Metadata } from 'next';
import { PageHero } from '@/components/site/PageHero';
import WorkLocator from '@/components/examples/WorkLocator';

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

// 構成：PageHero → 代表挨拶（プロフィールのカード ＋ 挨拶文）→ 会社概要（表 ＋ 所在地の地図）
export default function CompanyPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="Company"
        title="会社概要"
        description={
          // 文節ごとに inline-block にして「へ。」だけが次の行に落ちないようにする
          <span className="[&>span]:inline-block">
            <span>街の塗装屋さんから、</span><span>知り合いの塗装屋さんへ。</span>
            <span>最高の仕上がりを、</span><span>適正価格で。</span>
          </span>
        }
      />

      {/* 代表挨拶 */}
      <section className="bg-paper pb-[var(--section-gap)]">
        <div className="container">
          <p className="eyebrow">Message</p>
          <h2 className="mt-4 max-w-none">どうして、独立したの？</h2>

          <div className="mt-[var(--space-2xl)] grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10 items-start">
            {/* 代表のプロフィール */}
            <div className="lg:col-span-5">
              {REP_PHOTO ? (
                <figure className="m-0">
                  <div className="photo relative aspect-[4/5]" data-slot="representative">
                    <img src={REP_PHOTO} alt="株式会社 丸愛装業 代表取締役 小林 力也" width={800} height={1000} />
                  </div>
                </figure>
              ) : null}
              <div className={`rounded-card bg-plate border border-paper-3 shadow-card p-6 md:p-8 ${REP_PHOTO ? "mt-4" : ""}`}>
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="grid place-items-center w-16 h-16 rounded-full bg-ink text-plate-ink font-display font-bold text-2xl"
                  >
                    丸
                  </span>
                  <div>
                    <p className="text-sm text-ink-2">株式会社 丸愛装業　代表取締役</p>
                    <p className="mt-1 font-display font-bold text-[1.875rem] leading-tight text-ink tracking-[0.08em]">小林 力也</p>
                  </div>
                </div>
                <ul className="mt-6 grid gap-3">
                  {REP_POINTS.map((p) => (
                    <li key={p.text} className="flex items-center gap-3 rounded-control bg-paper-2 px-4 py-3 text-[0.9375rem] font-medium text-ink">
                      <i className={`${p.icon} text-xl text-accent`} aria-hidden="true"></i>
                      <span>{p.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 挨拶文 */}
            <div className="lg:col-span-6 lg:col-start-7">
              <figure className="m-0 relative">
                <i className="ri-double-quotes-l absolute -top-2 -left-1 text-5xl text-accent opacity-80" aria-hidden="true"></i>
                <blockquote className="m-0 pl-12">
                  <p className="font-display font-bold text-[clamp(1.5rem,1.6vw+1rem,2.25rem)] leading-[1.5] text-ink [&>span]:inline-block">
                    <span>「期待しているよ」</span>
                    <br />
                    <span>その言葉に、</span>
                    <span>真っ直ぐ応えたくて。</span>
                  </p>
                </blockquote>
              </figure>
              <div className="mt-8 space-y-5 text-base text-ink-2 leading-[1.9] max-w-[38em]">
                <p>100万円を貯めるのに、3年、5年とかかる方も少なくありません。その大切なお金で行う外壁塗装が、本当に信頼できる業者に任せられているか。私はそこを一番に考えています。</p>
                <p>営業会社が請けた工事では、職人に渡る材料費や工賃が削られ、どう頑張っても良い仕事ができない。その悔しさが、独立の原点です。小さな会社だからこそ、一件一件に真心を込めて対応します。</p>
              </div>
              <p className="mt-8 flex items-center justify-end gap-3 text-sm text-ink-2">
                株式会社 丸愛装業　代表取締役
                <span className="font-display font-bold text-[1.5rem] text-ink tracking-[0.12em]">小林 力也</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 会社概要：表と、所在地の地図 */}
      <section className="bg-paper-2 border-t border-paper-3 py-[var(--section-gap)]">
        <div className="container">
          <p className="eyebrow">Profile</p>
          <h2 className="mt-4">どこの、どんな会社？</h2>

          <div className="mt-[var(--space-2xl)] grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8 items-start">
            <dl className="lg:col-span-7 rounded-card bg-plate border border-paper-3 overflow-hidden">
              {CORP.map(([k, v]) => (
                <div key={String(k)} className="grid grid-cols-1 sm:grid-cols-[9em_minmax(0,1fr)] border-b border-paper-3 last:border-b-0">
                  <dt className="px-5 pt-4 sm:py-4 sm:bg-paper-2 text-sm font-bold text-ink">{k}</dt>
                  <dd className="m-0 px-5 pb-4 pt-1 sm:py-4 text-[0.9375rem] text-ink-2 tabular-nums">{v}</dd>
                </div>
              ))}
              <div className="grid grid-cols-1 sm:grid-cols-[9em_minmax(0,1fr)]">
                <dt className="px-5 pt-4 sm:py-4 sm:bg-paper-2 text-sm font-bold text-ink">公式SNS</dt>
                <dd className="m-0 px-5 pb-4 pt-1 sm:py-4 flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem]">
                  <a href="https://line.me/ti/p/UxXZqXMSWE" target="_blank" rel="nofollow noopener noreferrer" className="link inline-flex items-center gap-1.5">
                    <i className="ri-line-fill" aria-hidden="true"></i>公式LINE
                  </a>
                  <a href="https://www.instagram.com/maruaisougyou" target="_blank" rel="nofollow noopener noreferrer" className="link inline-flex items-center gap-1.5 whitespace-nowrap">
                    <i className="ri-instagram-line" aria-hidden="true"></i>@maruaisougyou
                  </a>
                </dd>
              </div>
            </dl>

            <div className="lg:col-span-5 rounded-card bg-plate border border-paper-3 p-5 md:p-6">
              <p className="flex items-center gap-2 font-display font-bold text-title text-ink">
                <i className="ri-map-pin-2-fill text-accent" aria-hidden="true"></i>
                所在地
              </p>
              <WorkLocator location="茨城県阿見町" className="mt-4" />
              <p className="mt-4 text-[0.9375rem] text-ink leading-relaxed">
                〒300-0325
                <br />
                茨城県稲敷郡阿見町上条888
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=%E8%8C%A8%E5%9F%8E%E7%9C%8C%E7%A8%B2%E6%95%B7%E9%83%A1%E9%98%BF%E8%A6%8B%E7%94%BA%E4%B8%8A%E6%9D%A1888"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--secondary w-full mt-5"
              >
                <i className="ri-map-2-line text-xl" aria-hidden="true"></i>
                Googleマップで開く
              </a>
              <p className="mt-3 text-xs text-muted">地図：国土数値情報（行政区域データ）・国土地理院ベクトルタイルを加工して作成</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
