'use client';
import { useEffect, useRef, useState } from "react";
import IbarakiMap from "./IbarakiMap";

const services = [
  {
    icon: "ri-building-line",
    number: "01",
    title: "外壁塗装",
    subtitle: "美観と耐久性を両立",
    desc: "お家の美観を保ち、風雨から大切な住まいを守る外壁塗装。適切な塗料選びと丁寧な施工で、10年先も色褪せない仕上がりを実現します。",
    points: ["遮熱・断熱効果で光熱費削減", "紫外線・酸性雨から建物を保護", "10年保証で安心の長期サポート"],
    image: "https://readdy.ai/api/search-image?query=Elegant%20freshly%20painted%20Japanese%20residential%20house%20exterior%20wall%20with%20smooth%20beautiful%20finish%20texture%2C%20warm%20natural%20daylight%2C%20clean%20modern%20aesthetic%2C%20professional%20architectural%20photography%2C%20soft%20shadows%2C%20premium%20quality%20look%2C%20neutral%20warm%20beige%20tones%2C%20simple%20uncluttered%20composition&width=800&height=560&seq=maruai-service-v2-01&orientation=landscape",
  },
  {
    icon: "ri-home-5-line",
    number: "02",
    title: "屋根塗装",
    subtitle: "雨漏り防止と断熱性能向上",
    desc: "雨漏り防止と耐久性アップのための屋根塗装。専門的な知識と技術で、お家の一番重要な部分をしっかり守ります。",
    points: ["防水性を高め雨漏りを根本防止", "遮熱塗料で夏の室温を快適に", "屋根材の寿命を最大限に延ばす"],
    image: "https://readdy.ai/api/search-image?query=Beautifully%20coated%20Japanese%20house%20roof%20with%20smooth%20protective%20finish%20under%20clear%20blue%20sky%2C%20professional%20architectural%20detail%20photography%2C%20warm%20sunlight%20highlighting%20the%20roof%20texture%2C%20clean%20simple%20composition%2C%20premium%20quality%20aesthetic%2C%20neutral%20tones&width=800&height=560&seq=maruai-service-v2-02&orientation=landscape",
  },
  {
    icon: "ri-drop-line",
    number: "03",
    title: "コーキング",
    subtitle: "気密性を高め建物寿命を延長",
    desc: "窓や壁の隙間を埋め、雨や風の侵入を防ぐコーキング工事。細かな部分まで丁寧に施工し、気密性を高めます。",
    points: ["窓枠・目地の劣化を完全補修", "高い弾性で建物の動きに追随", "外壁塗装前に必須の下地処理"],
    image: "https://readdy.ai/api/search-image?query=Professional%20precision%20caulking%20and%20sealant%20application%20on%20house%20window%20frame%20joint%2C%20clean%20smooth%20finish%2C%20close-up%20detail%20of%20waterproof%20seal%2C%20bright%20natural%20daylight%2C%20professional%20photography%2C%20warm%20neutral%20color%20palette%2C%20simple%20uncluttered%20background&width=800&height=560&seq=maruai-service-v2-03&orientation=landscape",
  },
  {
    icon: "ri-shield-check-line",
    number: "04",
    title: "防水工事",
    subtitle: "水の侵入から建物を完全防御",
    desc: "ベランダや屋上の防水工事。水漏れから建物を守り、住まいの価値を維持する重要な施工です。",
    points: ["ベランダ・屋上の水漏れ防止", "FRP・ウレタン防水で確実施工", "コンクリートの中性化を抑制"],
    image: "https://readdy.ai/api/search-image?query=Clean%20seamless%20waterproof%20coating%20on%20modern%20Japanese%20balcony%20surface%2C%20water%20droplets%20beading%20on%20protected%20surface%2C%20professional%20architectural%20photography%2C%20bright%20natural%20daylight%2C%20clean%20minimalist%20aesthetic%2C%20warm%20neutral%20tones%2C%20simple%20composition&width=800&height=560&seq=maruai-service-v2-04&orientation=landscape",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group bg-background-50 rounded-2xl overflow-hidden border border-background-200/70 transition-all duration-700 cursor-pointer ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
        {/* Image */}
        <div className="w-full md:w-1/2 h-52 md:h-72 overflow-hidden relative">
          <img
            src={service.image}
            alt={`${service.title}の施工イメージ`}
            title={`茨城県阿見町 ${service.title}専門店 丸愛装業`}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              hovered ? "scale-105" : "scale-100"
            }`}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          {/* Number badge */}
          <div className="absolute top-4 left-4 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-background-50/90 backdrop-blur-sm rounded-xl shadow-sm">
            <span className="font-heading text-lg md:text-xl font-bold text-accent-600">
              {service.number}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 p-5 md:p-7 flex flex-col justify-center">
          <div className="w-10 h-10 flex items-center justify-center bg-primary-100 rounded-xl text-primary-600 mb-3 transition-colors group-hover:bg-primary-200">
            <i className={`${service.icon} text-lg`}></i>
          </div>

          <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground-900 mb-1">
            {service.title}
          </h3>
          <p className="text-sm md:text-base text-primary-600 font-semibold mb-3">
            {service.subtitle}
          </p>
          <p className="text-base text-foreground-600 leading-relaxed mb-4">
            {service.desc}
          </p>

          {/* Key points */}
          <div className="space-y-2">
            {service.points.map((point, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-5 h-5 flex items-center justify-center bg-accent-100 rounded-full shrink-0 mt-0.5">
                  <i className="ri-check-line text-accent-600 text-xs"></i>
                </div>
                <span className="text-sm md:text-base text-foreground-700">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServiceSection() {
  return (
    <section id="service" className="w-full py-14 md:py-24 bg-background-100">
      <div className="w-full px-4 md:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-100 border border-accent-200/60 mb-4">
            <div className="w-5 h-5 flex items-center justify-center bg-accent-500 rounded-full">
              <i className="ri-tools-line text-background-50 text-xs"></i>
            </div>
            <span className="text-accent-700 text-sm md:text-base font-bold tracking-widest uppercase">
              Our Services
            </span>
          </div>

          <h4 className="font-heading text-3xl md:text-5xl font-bold text-foreground-900 mb-3">
            <a href="#service">丸愛装業の施工内容</a>
          </h4>

          <p className="text-foreground-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            <strong>外壁塗装</strong>・<strong>屋根塗装</strong>・<strong>コーキング</strong>・<strong>防水工事</strong>。
            <br className="sm:hidden" />
            すべて<strong className="text-accent-600">完全自社施工・中間マージンゼロ</strong>で、
            <br className="hidden md:block" />
            適正価格と最高品質を両立します。
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-5">
            <div className="flex items-center gap-2 text-sm text-foreground-600">
              <i className="ri-shield-check-line text-accent-500"></i>
              <span>10年保証</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground-600">
              <i className="ri-user-star-line text-accent-500"></i>
              <span>代表が全責任</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground-600">
              <i className="ri-price-tag-3-line text-accent-500"></i>
              <span>適正価格</span>
            </div>
          </div>
        </div>

        {/* Service Cards */}
        <div className="space-y-5 md:space-y-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* Service Area */}
        <div className="mt-10 md:mt-16 bg-background-50 rounded-2xl overflow-hidden border border-background-200/70">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Text side */}
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 border border-primary-200/60 mb-4 w-fit">
                <i className="ri-map-pin-line text-primary-600 text-sm"></i>
                <span className="text-primary-700 text-sm font-bold">施工エリア</span>
              </div>

              <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground-900 mb-3">
                60分以内に駆けつけられる距離で
              </h3>
              <p className="text-base md:text-lg text-foreground-700 mb-2 font-semibold">
                阿見町・牛久市・土浦市・つくば市・取手市・龍ヶ崎市
              </p>
              <p className="text-base text-foreground-600 leading-relaxed mb-3">
                丸愛装業ではお客様のご相談や不安をなるべく早く解決するために、すぐ駆けつけられる60分以内のエリアに限定しています。ご近所だからこそ、完工後のアフターフォローも万全です。
              </p>
              <p className="text-sm text-foreground-500">
                ※親族の方、お知り合いの方が県外の場合はご相談ください。
              </p>
            </div>

            <IbarakiMap />
          </div>
        </div>

        {/* Bottom CTA - fix for shadow usage: use glow via border instead */}
        <div className="mt-8 md:mt-12 text-center">
          <p className="text-base text-foreground-600 mb-4">
            まずは<strong>おおよその料金</strong>をチェックしてみませんか？
          </p>
          <a
            href="#simulation"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary-500 text-background-50 font-bold text-lg md:text-xl hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer border-2 border-primary-400/30"
          >
            <i className="ri-calculator-line text-xl"></i>
            料金シミュレーションへ
            <i className="ri-arrow-down-line"></i>
          </a>
        </div>
      </div>
    </section>
  );
}