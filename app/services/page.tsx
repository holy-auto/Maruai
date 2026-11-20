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
        title="外壁・屋根の、何を頼める？"
        description="外壁塗装・屋根塗装・コーキング・防水工事。塗装工事をお考えなら、もう一社お見積もりを取りませんか。"
      />

      {/* Rows：名前と費用を1〜5列、説明とサインを6〜12列。行の間は細い罫 */}
      <section className="bg-paper pb-[var(--section-gap)]">
        <div className="container grid gap-6">
          {SERVICE_LIST.map((s) => (
            <article
              key={s.slug}
              className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6 rounded-card bg-plate border border-paper-3 p-6 md:p-10"
            >
              <div className="lg:col-span-5">
                <h2>{splitName(s.name)}</h2>
                <p className="mt-3 inline-flex items-center gap-2 rounded-control bg-paper-2 px-3 py-1.5 text-sm font-bold text-ink tabular-nums"><i className="ri-price-tag-3-line text-accent" aria-hidden="true"></i>{s.priceFrom}</p>
                {s.image ? (
                  <figure className="mt-8 m-0">
                    <div
                      className="photo aspect-[3/2]"
                      data-slot="service"
                      data-alt={s.imageAlt ?? `${s.name}の施工写真`}
                    >
                      <img src={s.image} alt={s.imageAlt ?? `${s.name}の施工写真`} loading="lazy" style={{ objectPosition: s.imagePosition ?? "50% 15%" }} />
                    </div>
                    {s.imageIsStock && <figcaption className="mt-2 label">イメージ写真</figcaption>}
                  </figure>
                ) : null}
              </div>
              <div className="lg:col-span-7">
                <p className="lead">{s.lead}</p>
                <ul className="mt-6 grid gap-2">
                  {s.symptoms.map((sym) => (
                    <li key={sym} className="flex items-start gap-3 rounded-control bg-paper-2 px-4 py-3 text-[0.9375rem] text-ink">
                      <i className="ri-checkbox-circle-fill text-xl leading-6 text-accent" aria-hidden="true"></i>
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/services/${s.slug}`} className="btn btn--secondary mt-6 whitespace-nowrap">
                  <span className="visually-hidden">{s.name}を</span>詳しく見る
                  <i className="ri-arrow-right-line" aria-hidden="true"></i>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 補足の2項：アイコン付きのカード */}
      <section className="bg-paper-2 border-y border-paper-3 py-[var(--section-gap-s)]">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-card bg-plate border border-paper-3 p-6 md:p-8">
            <span className="grid place-items-center w-12 h-12 rounded-full bg-ink text-plate-ink" aria-hidden="true"><i className="ri-drop-line text-2xl"></i></span>
            <h3 className="mt-4">高圧洗浄だけでもOK</h3>
            <p className="mt-3 flex items-baseline gap-1.5 font-figure font-bold text-ink tabular-nums">
              <span className="text-[2.75rem] leading-none">2</span>
              <span className="font-display text-xl">万円</span>
              <span className="ml-2 text-sm font-body font-medium text-ink-2">税込・100㎡まで</span>
            </p>
            <p className="mt-3 text-[0.9375rem] text-ink-2">
              外構・駐車場・カーポートの高圧洗浄（100㎡まで）<strong className="font-bold text-ink">税込2万円</strong>。塗装をご契約のお客様は無償で実施します。
            </p>
          </div>
          <div className="rounded-card bg-plate border border-paper-3 p-6 md:p-8">
            <span className="grid place-items-center w-12 h-12 rounded-full bg-accent text-accent-ink" aria-hidden="true"><i className="ri-umbrella-line text-2xl"></i></span>
            <h3 className="mt-4">火災保険の活用診断</h3>
            <p className="mt-3 text-[0.9375rem] text-ink-2">
              風・雨・雪・雹などによる外壁・屋根の被害は、火災保険の<strong className="font-bold text-ink">風災補償</strong>の対象になる場合があります。診断は無料です。
            </p>
          </div>
        </div>
      </section>

      {/* ご依頼の流れ：アイコンと番号の5ステップ */}
      <section className="bg-paper py-[var(--section-gap)]">
        <div className="container">
          <p className="eyebrow">Flow</p>
          <h2 className="mt-4">無理な営業は、一切しません。</h2>
          <ol className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {FLOW.map((f, i) => (
              <li key={f.t} className="rounded-card bg-plate border border-paper-3 p-5">
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center w-10 h-10 rounded-full bg-accent text-accent-ink font-figure font-bold" aria-hidden="true">{i + 1}</span>
                  <h3 className="text-[1.1875rem]">{f.t}</h3>
                </div>
                <p className="mt-3 text-sm text-ink-2 leading-relaxed">{f.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
