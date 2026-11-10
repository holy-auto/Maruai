import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';
import { PageHero } from '@/components/site/PageHero';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: '株式会社 丸愛装業の個人情報の取り扱い（プライバシーポリシー）について。',
  alternates: { canonical: '/privacy' },
};

const ENACTED = '2026年11月10日';

type Section = { title: string; body: React.ReactNode };

const SECTIONS: Section[] = [
  {
    title: '1. 個人情報の取り扱いについて',
    body: (
      <p>
        株式会社 丸愛装業（以下「当社」）は、お客様の個人情報を適切に取り扱うことが社会的責務であると考え、個人情報の保護に関する法律その他の関係法令を遵守し、以下のとおり個人情報を取り扱います。
      </p>
    ),
  },
  {
    title: '2. 取得する個人情報',
    body: (
      <>
        <p>当社は、お問い合わせ・お見積りのご依頼・現地調査・工事のご契約等に際して、次の情報を取得します。</p>
        <ul className="list-disc pl-6 mt-3 space-y-1">
          <li>お名前</li>
          <li>メールアドレス、電話番号</li>
          <li>ご住所（現地調査・工事の際）</li>
          <li>お問い合わせ内容、概算料金シミュレーションの結果</li>
          <li>建物の写真・状態など、ご相談のためにご提供いただいた情報</li>
        </ul>
      </>
    ),
  },
  {
    title: '3. 利用目的',
    body: (
      <>
        <p>取得した個人情報は、次の目的の範囲内で利用します。</p>
        <ul className="list-disc pl-6 mt-3 space-y-1">
          <li>お問い合わせ・ご相談への回答、ご連絡</li>
          <li>現地調査、お見積りの作成・ご提示</li>
          <li>工事の実施、工事後のアフターフォロー・保証対応</li>
          <li>ご契約に基づく請求・お支払いに関する手続き</li>
          <li>サービス向上のための分析（個人を特定しない形に加工したうえで行います）</li>
        </ul>
      </>
    ),
  },
  {
    title: '4. 第三者への提供',
    body: (
      <p>
        当社は、次の場合を除き、ご本人の同意なく個人情報を第三者に提供しません。法令に基づく場合／人の生命・身体または財産の保護のために必要で、ご本人の同意を得ることが困難な場合／国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに協力する必要がある場合。
      </p>
    ),
  },
  {
    title: '5. 業務の委託と外部サービスの利用',
    body: (
      <>
        <p>
          当社は、利用目的の達成に必要な範囲で、個人情報の取り扱いを外部に委託することがあります。その場合は、委託先に対して必要かつ適切な監督を行います。
        </p>
        <p className="mt-3">
          当社は、ウェブサイトの運営およびお問い合わせ内容の保存に、米国の事業者が提供するクラウドサービス（Vercel Inc.、Supabase Inc.）を利用しています。お問い合わせフォームから送信された内容は、日本国内（東京リージョン）のサーバーに保存されます。当社は、米国における個人情報の保護に関する制度を把握したうえで、必要な安全管理措置を講じます。
        </p>
      </>
    ),
  },
  {
    title: '6. 安全管理措置',
    body: (
      <p>
        当社は、個人情報の漏えい・滅失・毀損を防止するため、アクセスできる者の限定、通信の暗号化、従業者への教育など、必要かつ適切な安全管理措置を講じます。利用目的を達成した個人情報は、法令で保存が求められる場合を除き、遅滞なく消去します。
      </p>
    ),
  },
  {
    title: '7. 開示・訂正・利用停止等のご請求',
    body: (
      <p>
        ご本人から、保有個人情報の利用目的の通知、開示、訂正・追加・削除、利用停止・消去、第三者提供の停止のご請求があった場合は、ご本人であることを確認したうえで、法令に従い遅滞なく対応します。ご請求は下記のお問い合わせ窓口までご連絡ください。
      </p>
    ),
  },
  {
    title: '8. アクセス情報について',
    body: (
      <p>
        当社ウェブサイトでは、現在アクセス解析ツールや広告配信のためのCookieは使用していません。ただし、サーバーの運用・セキュリティ確保のため、ホスティング事業者においてIPアドレス等のアクセス記録が保存されることがあります。また、LINE・Instagram等の外部サービスへのリンク先では、各事業者のプライバシーポリシーが適用されます。
      </p>
    ),
  },
  {
    title: '9. プライバシーポリシーの変更',
    body: (
      <p>
        当社は、法令の改正や業務内容の変更に応じて、本ポリシーを改定することがあります。改定後の内容は、本ページに掲載した時点から効力を生じます。
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'ホーム', url: '/' },
          { name: 'プライバシーポリシー', url: '/privacy' },
        ])}
      />
      <PageHero
        eyebrow="Privacy Policy"
        title="プライバシーポリシー"
        description="お客様の個人情報の取り扱いについて"
      />

      <section className="w-full py-14 md:py-20 bg-background-50">
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-3xl mx-auto">
          <div className="space-y-10 text-base text-foreground-700 leading-relaxed">
            {SECTIONS.map((s) => (
              <section key={s.title}>
                <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground-900 mb-3 pb-2 border-b border-background-200/70">
                  {s.title}
                </h2>
                {s.body}
              </section>
            ))}

            <section>
              <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground-900 mb-3 pb-2 border-b border-background-200/70">
                10. お問い合わせ窓口
              </h2>
              <div className="bg-background-100 rounded-xl border border-background-200/70 p-5 md:p-6">
                <dl className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-semibold text-foreground-900 sm:w-28 shrink-0">事業者名</dt>
                    <dd>株式会社 丸愛装業</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-semibold text-foreground-900 sm:w-28 shrink-0">代表者</dt>
                    <dd>代表取締役　小林 力也</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-semibold text-foreground-900 sm:w-28 shrink-0">所在地</dt>
                    <dd>〒300-0325　茨城県稲敷郡阿見町上条888</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-semibold text-foreground-900 sm:w-28 shrink-0">電話</dt>
                    <dd>
                      <a href="tel:029-886-7913" className="text-primary-700 hover:text-primary-800 font-medium">029-886-7913</a>
                      （平日 9:00〜18:00）
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-4">
                    <dt className="font-semibold text-foreground-900 sm:w-28 shrink-0">フォーム</dt>
                    <dd>
                      <Link href="/contact" className="text-primary-700 hover:text-primary-800 font-medium">お問い合わせページ</Link>
                    </dd>
                  </div>
                </dl>
              </div>
            </section>

            <p className="text-sm text-foreground-500 text-right">制定日：{ENACTED}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
