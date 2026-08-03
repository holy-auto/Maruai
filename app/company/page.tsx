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
          <div className="h-64 md:h-80 rounded-xl bg-foreground-800 flex items-center justify-center text-background-400 text-sm">［ 代表・小林力也の写真 ］</div>
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
