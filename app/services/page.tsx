import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICE_LIST } from '@/lib/services';
import { PageHero } from '@/components/site/PageHero';

export const metadata: Metadata = {
  title: 'サービス・施工内容',
  description: '外壁塗装・屋根塗装・コーキング・防水工事。茨城県阿見町の完全自社施工。塗装工事をお考えなら、もう一社お見積もりを。',
  alternates: { canonical: '/services' },
};

const FLOW = [
  { t: 'ご相談', d: 'LINE・電話・フォームからお気軽に。' },
  { t: '現地診断', d: '代表が直接、外壁・屋根を点検します。' },
  { t: 'お見積り', d: '内訳の明確な、適正価格をご提示。' },
  { t: '施工', d: '自社の職人が、丁寧に塗り上げます。' },
  { t: 'アフター', d: '最長10年保証で、その後も安心。' },
];

// 和文の見出しを語の途中で折り返さないよう、括弧の前で分けて inline-block にする
function splitName(name: string) {
  return name.split(/(?=（)/).map((part) => (
    <span key={part} className="inline-block">
      {part}
    </span>
  ));
}

// sections: Rows（4つのサービス、写真があれば左列に）· Band paper-2（2つの補足）· Steps（<ol> 5段）
export default function ServicesPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="Services"
        title="サービス・施工内容"
        description="外壁塗装・屋根塗装・コーキング・防水工事。塗装工事をお考えなら、もう一社お見積もりを取りませんか。"
      />

      {/* Rows：名前と費用を1〜5列、説明とサインを6〜12列。行の間は細い罫 */}
      <section className="bg-paper pb-[var(--section-gap)]">
        <div className="container">
          {SERVICE_LIST.map((s) => (
            <article
              key={s.slug}
              className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6 py-[var(--space-2xl)] first:pt-0 border-t-hair border-paper-3 first:border-t-0"
            >
              <div className="lg:col-span-5">
                <h2>{splitName(s.name)}</h2>
                <p className="mt-4 font-display font-bold text-lg text-ink tabular-nums">{s.priceFrom}</p>
                {s.image ? (
                  <figure
                    className="photo mt-8 aspect-[4/3]"
                    data-slot="service"
                    data-alt={`${s.name}の施工写真`}
                  >
                    <img src={s.image} alt={`${s.name}の施工写真`} loading="lazy" />
                  </figure>
                ) : null}
              </div>
              <div className="lg:col-span-7">
                <p className="lead">{s.lead}</p>
                <ul className="mt-8 border-t-hair border-paper-3">
                  {s.symptoms.map((sym) => (
                    <li key={sym} className="flex items-start gap-3 py-3 border-b-hair border-paper-3 text-ink">
                      <i className="ri-check-line text-xl leading-7 text-ink" aria-hidden="true"></i>
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/services/${s.slug}`} className="link mt-8 inline-block font-medium whitespace-nowrap">
                  <span className="visually-hidden">{s.name}を</span>詳しく見る
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Band：一段暗い面に、補足の2項を並べる */}
      <section className="bg-paper-2 py-[var(--section-gap-s)]">
        <div className="container grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
          <div className="md:col-span-6 rule-bar pt-6">
            <h3>高圧洗浄だけでもOK</h3>
            <p className="mt-3">
              外構・駐車場・カーポートの高圧洗浄（100㎡まで）<strong className="font-bold">税込2万円</strong>。塗装をご契約のお客様は無償で実施します。
            </p>
          </div>
          <div className="md:col-span-6 rule-bar pt-6">
            <h3>火災保険の活用診断</h3>
            <p className="mt-3">
              風・雨・雪・雹などによる外壁・屋根の被害は、火災保険の<strong className="font-bold">風災補償</strong>の対象になる場合があります。診断は無料です。
            </p>
          </div>
        </div>
      </section>

      {/* Steps：本物の <ol>。番号は Oswald の数字、上端に墨の太線 */}
      <section className="bg-paper py-[var(--section-gap)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8">
            <h2 className="lg:col-span-7">無理な営業は、一切しません。</h2>
          </div>
          <ol className="mt-12 grid grid-cols-1 lg:grid-cols-5 border-t-bar border-ink">
            {FLOW.map((f, i) => (
              <li
                key={f.t}
                className="grid grid-cols-[3.5rem_minmax(0,1fr)] lg:grid-cols-1 gap-x-4 gap-y-3 py-6 border-b-hair border-paper-3 lg:border-b-0 lg:pt-8 lg:pb-0 lg:px-6 lg:border-l-hair lg:first:border-l-0 lg:first:pl-0"
              >
                <span aria-hidden="true" className="font-figure font-bold text-display-s leading-none text-ink tabular-nums">
                  {i + 1}
                </span>
                <div>
                  <h3>{f.t}</h3>
                  <p className="mt-2 text-ink-2">{f.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
