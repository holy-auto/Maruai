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
  { icon: 'ri-chat-3-line', t: 'ご相談', d: 'LINE・電話・フォームからお気軽に。' },
  { icon: 'ri-search-eye-line', t: '現地診断', d: '代表が直接、外壁・屋根を点検します。' },
  { icon: 'ri-file-list-3-line', t: 'お見積り', d: '内訳の明確な、適正価格をご提示。' },
  { icon: 'ri-brush-line', t: '施工', d: '自社の職人が、丁寧に塗り上げます。' },
  { icon: 'ri-shield-check-line', t: 'アフター', d: '最長10年保証で、その後も安心。' },
];

export default function ServicesPage() {
  return (
    <main className="relative">
      <PageHero
        eyebrow="Services"
        title="サービス・施工内容"
        description="外壁塗装・屋根塗装・コーキング・防水工事。塗装工事をお考えなら、もう一社お見積もりを取りませんか。"
      />
      <section className="w-full py-14 md:py-20 bg-background-50">
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {SERVICE_LIST.map((s) => (
              <article key={s.slug} className="bg-background-100 rounded-xl border border-background-200/70 overflow-hidden flex flex-col">
                <div className="h-40 bg-background-200 flex items-center justify-center text-foreground-400 text-sm">［ {s.name}の写真 ］</div>
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground-900 mb-2">{s.name}</h2>
                  <p className="text-base text-foreground-600 leading-relaxed mb-4">{s.lead}</p>
                  <ul className="space-y-1.5 mb-4">
                    {s.symptoms.map((sym) => (
                      <li key={sym} className="flex items-start gap-2 text-base text-foreground-700">
                        <i className="ri-check-line text-primary-500 mt-1"></i>{sym}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <div className="text-primary-700 font-bold mb-3">{s.priceFrom}</div>
                    <Link href={`/services/${s.slug}`} className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-background-300/60 text-foreground-700 text-base font-medium hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300 transition-colors">
                      詳しく見る<i className="ri-arrow-right-line"></i>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            <div className="bg-primary-50 rounded-xl border border-primary-200/60 p-6">
              <h3 className="font-heading text-lg font-bold text-foreground-900 mb-2">高圧洗浄だけでもOK</h3>
              <p className="text-base text-foreground-600 leading-relaxed">外構・駐車場・カーポートの高圧洗浄（100㎡まで）<span className="font-semibold text-primary-700">税込2万円</span>。塗装をご契約のお客様は無償で実施します。</p>
            </div>
            <div className="bg-secondary-50 rounded-xl border border-secondary-200/60 p-6">
              <h3 className="font-heading text-lg font-bold text-foreground-900 mb-2">火災保険の活用診断</h3>
              <p className="text-base text-foreground-600 leading-relaxed">風・雨・雪・雹などによる外壁・屋根の被害は、火災保険の<span className="font-semibold text-secondary-800">風災補償</span>の対象になる場合があります。診断は無料です。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-14 md:py-20 bg-background-100">
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-accent-500 text-base font-semibold tracking-widest uppercase mb-2">Flow</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground-900">無理な営業は、一切しません。</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {FLOW.map((f, i) => (
              <div key={f.t} className="bg-background-50 rounded-xl border border-background-200/70 p-5 text-center">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-primary-100 rounded-full text-primary-600 text-xl"><i className={f.icon}></i></div>
                <div className="text-xs text-accent-500 font-bold mb-1">STEP {i + 1}</div>
                <h3 className="font-heading text-base font-bold text-foreground-900 mb-1">{f.t}</h3>
                <p className="text-sm text-foreground-600 leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
