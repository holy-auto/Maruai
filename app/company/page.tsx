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

export default function CompanyPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="About us"
        title="会社概要"
        description="街の塗装屋さんから、知り合いの塗装屋さんへ。最高の仕上がりを、適正価格で。"
      />

      <section className="w-full py-14 md:py-20 bg-foreground-900 text-background-100">
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {REP_PHOTO ? (
            <img
              src={REP_PHOTO}
              alt="株式会社 丸愛装業 代表取締役 小林 力也"
              className="w-full h-72 md:h-96 rounded-xl object-cover"
            />
          ) : (
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-700 to-primary-900 p-7 md:p-9 ring-1 ring-background-50/10">
              <i
                className="ri-double-quotes-l absolute -right-2 -top-6 text-[10rem] leading-none text-background-50/10"
                aria-hidden="true"
              ></i>
              <div className="relative">
                <span className="text-accent-300 text-sm font-semibold tracking-widest uppercase">Representative</span>
                <p className="mt-2 text-base text-background-200">代表取締役</p>
                <p className="font-heading text-3xl md:text-4xl font-bold text-background-50 tracking-wide">小林 力也</p>
                <ul className="mt-6 pt-6 border-t border-background-50/15 space-y-3">
                  {REP_POINTS.map((p) => (
                    <li key={p.text} className="flex items-start gap-3 text-base text-background-100">
                      <span className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-background-50/15 text-accent-300">
                        <i className={p.icon} aria-hidden="true"></i>
                      </span>
                      <span className="pt-1 leading-relaxed">{p.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div>
            <span className="inline-block text-accent-400 text-base font-semibold tracking-widest uppercase mb-3">代表挨拶</span>
            <p className="font-heading text-2xl md:text-3xl font-bold leading-relaxed text-background-50 mb-5">
              「期待しているよ」<br />その言葉に、<br /><span className="text-accent-400">真っ直ぐ応えたくて。</span>
            </p>
            <div className="space-y-4 text-base text-background-200 leading-relaxed">
              <p>100万円を貯めるのに、3年、5年とかかる方も少なくありません。その大切なお金で行う外壁塗装が、本当に信頼できる業者に任せられているか——。私はそこを一番に考えています。</p>
              <p>営業会社が請けた工事では、職人に渡る材料費や工賃が削られ、どう頑張っても良い仕事ができない。その悔しさが、独立の原点です。小さな会社だからこそ、一件一件に真心を込めて対応します。</p>
            </div>
            <p className="mt-6 text-base text-background-300">株式会社 丸愛装業　代表取締役　<b className="font-heading text-background-50">小林 力也</b></p>
          </div>
        </div>
      </section>

      <section className="w-full py-14 md:py-20 bg-background-50">
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-accent-500 text-base font-semibold tracking-widest uppercase mb-2">Company profile</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground-900">会社概要</h2>
          </div>
          <dl className="bg-background-100 rounded-xl border border-background-200/70 divide-y divide-background-200/70 overflow-hidden">
            {CORP.map(([k, v]) => (
              <div key={String(k)} className="grid grid-cols-1 sm:grid-cols-3 gap-1 px-5 py-4 md:px-6">
                <dt className="text-sm font-semibold text-foreground-500">{k}</dt>
                <dd className="sm:col-span-2 text-base text-foreground-800">{v}</dd>
              </div>
            ))}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 px-5 py-4 md:px-6">
              <dt className="text-sm font-semibold text-foreground-500">公式SNS</dt>
              <dd className="sm:col-span-2 text-base text-foreground-800">
                <a href="https://line.me/ti/p/UxXZqXMSWE" className="text-primary-600 hover:text-primary-700">公式LINE</a>
                <span className="mx-2 text-foreground-300">／</span>
                <a href="https://www.instagram.com/maruaisougyou" className="text-primary-600 hover:text-primary-700">Instagram @maruaisougyou</a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}
