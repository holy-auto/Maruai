'use client';
import { useEffect, useRef, useState } from "react";

const reasons = [
  {
    icon: "ri-contrast-drop-2-line",
    title: "外壁のはがれ",
    severity: "危険",
    desc: "塗膜が浮き、ひび割れ、めくれが発生。放置すると雨水が内部に侵入し、建物の構造材が腐食する恐れがあります。",
    consequence: "放置 → 雨水浸入 → 柱・梁の腐食",
    image: "https://readdy.ai/api/search-image?query=Close-up%20detail%20of%20severely%20peeling%20and%20cracked%20exterior%20wall%20paint%20on%20Japanese%20house%2C%20flaking%20paint%20surface%20showing%20bare%20wall%20underneath%2C%20dramatic%20side%20lighting%20emphasizing%20texture%20and%20damage%2C%20professional%20photography%2C%20warm%20neutral%20tones%2C%20simple%20background&width=600&height=420&seq=maruai-reason-v2-01&orientation=landscape",
  },
  {
    icon: "ri-contrast-line",
    title: "白い粉がつく",
    severity: "注意",
    desc: "触ると白い粉が手につく「チョーキング現象」。塗膜の劣化サインで、防水性能が著しく低下している証拠です。",
    consequence: "放置 → 防水性喪失 → 外壁内部の劣化",
    image: "https://readdy.ai/api/search-image?query=Close-up%20of%20white%20chalking%20powder%20residue%20on%20weathered%20house%20exterior%20wall%20surface%2C%20degraded%20paint%20showing%20powdery%20texture%2C%20finger%20mark%20on%20chalky%20surface%2C%20dramatic%20natural%20lighting%2C%20professional%20photography%2C%20warm%20neutral%20color%20palette%2C%20simple%20composition&width=600&height=420&seq=maruai-reason-v2-02&orientation=landscape",
  },
  {
    icon: "ri-anticlockwise-2-line",
    title: "ひび割れ",
    severity: "危険",
    desc: "外壁にできたクラック（ひび割れ）から雨水が侵入。冬場は凍結膨張でさらに亀裂が拡大し、建物の寿命を縮めます。",
    consequence: "放置 → 亀裂拡大 → 構造躯体の損傷",
    image: "https://readdy.ai/api/search-image?query=Close-up%20of%20deep%20cracks%20and%20fissures%20on%20exterior%20wall%20surface%20of%20aged%20building%2C%20dramatic%20lighting%20from%20side%20casting%20shadows%20into%20cracks%2C%20showing%20severity%20of%20structural%20damage%2C%20professional%20photography%2C%20warm%20neutral%20background%2C%20simple%20composition&width=600&height=420&seq=maruai-reason-v2-03&orientation=landscape",
  },
  {
    icon: "ri-virus-line",
    title: "カビ・コケ・染み",
    severity: "注意",
    desc: "外壁に発生したカビやコケは見た目だけでなく、建物の美観と資産価値を著しく下げます。湿気の多い北面に発生しやすい傾向です。",
    consequence: "放置 → 美観損失 → 資産価値の低下",
    image: "https://readdy.ai/api/search-image?query=Close-up%20of%20dark%20mold%20stains%20and%20green%20moss%20growth%20on%20damp%20exterior%20wall%20surface%20of%20house%2C%20showing%20contrast%20between%20stained%20and%20clean%20areas%2C%20dramatic%20natural%20lighting%2C%20professional%20photography%2C%20warm%20neutral%20tones%2C%20simple%20composition&width=600&height=420&seq=maruai-reason-v2-04&orientation=landscape",
  },
];

function ReasonCard({ reason, index }: { reason: typeof reasons[0]; index: number }) {
  const [visible, setVisible] = useState(false);
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

  const isDanger = reason.severity === "危険";

  return (
    <div
      ref={ref}
      className={`group bg-background-50 rounded-2xl overflow-hidden border transition-all duration-700 cursor-pointer ${
        isDanger
          ? "border-red-200/60 hover:border-red-300/80"
          : "border-amber-200/60 hover:border-amber-300/80"
      } ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Image */}
      <div className="relative h-40 md:h-52 overflow-hidden">
        <img
          src={reason.image}
          alt={`外壁塗装の劣化サイン：${reason.title}`}
          title={`茨城県阿見町 外壁塗装診断 丸愛装業 - ${reason.title}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Severity Badge */}
        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
            isDanger
              ? "bg-red-500/90 text-background-50"
              : "bg-amber-500/90 text-background-50"
          }`}
        >
          <i className={`${isDanger ? "ri-alert-line" : "ri-error-warning-line"} mr-1`}></i>
          {reason.severity}
        </div>

        {/* Title Overlay at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 flex items-center justify-center rounded-lg ${
              isDanger ? "bg-red-500/80" : "bg-amber-500/80"
            }`}>
              <i className={`${reason.icon} text-background-50 text-sm`}></i>
            </div>
            <p className="text-background-50 font-heading font-bold text-base md:text-lg">
              {reason.title}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <p className="text-sm md:text-base text-foreground-700 leading-relaxed mb-3">
          {reason.desc}
        </p>

        {/* Consequence */}
        <div className={`rounded-lg px-3 py-2 text-xs md:text-sm ${
          isDanger ? "bg-red-50 text-red-700 border border-red-200/60" : "bg-amber-50 text-amber-700 border border-amber-200/60"
        }`}>
          <span className="font-bold">⚠︎ </span>
          {reason.consequence}
        </div>
      </div>
    </div>
  );
}

export default function ReasonSection() {
  return (
    <section id="reason" className="w-full py-14 md:py-24 bg-background-50">
      <div className="w-full px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200/60 mb-4">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-search-eye-line text-amber-600 text-sm"></i>
            </div>
            <span className="text-amber-700 text-sm md:text-base font-bold tracking-widest uppercase">
              Check Your Home
            </span>
          </div>

          <h4 className="font-heading text-3xl md:text-5xl font-bold text-foreground-900 mb-3">
            <a href="#reason">塗り替えが必要なサイン</a>
          </h4>

          <p className="text-foreground-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            <strong>7〜10年メンテナンスをしていない</strong>お家は、
            <br className="sm:hidden" />
            以下のような劣化サインが出始めている可能性があります。
            <br />
            <strong className="text-red-600">早めの対処が、結果的に費用を抑える近道</strong>です。
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8 md:mb-12">
          {reasons.map((reason, index) => (
            <ReasonCard key={reason.title} reason={reason} index={index} />
          ))}
        </div>

        {/* Advisory Box */}
        <div className="bg-background-100 rounded-2xl p-6 md:p-8 border border-background-200/70">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Left: Diagnosis CTA */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center bg-foreground-100 rounded-xl">
                  <i className="ri-magic-line text-foreground-700 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-heading text-lg md:text-xl font-bold text-foreground-900">
                    まずは無料診断を
                  </h3>
                  <p className="text-sm text-foreground-500">お気軽にご相談ください</p>
                </div>
              </div>
              <p className="text-base text-foreground-700 leading-relaxed mb-4">
                大切なお住まいを守り、長く住み続けるためにも定期的なメンテナンスが大切です。
                外壁の劣化は目に見えない部分から進行していることも多く、気づいたときには大きな修繕が必要になることもあります。
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary-500 text-background-50 font-bold text-base hover:bg-primary-600 transition-colors whitespace-nowrap"
                >
                  <i className="ri-chat-check-line"></i>
                  無料相談を申し込む
                </a>
                <a
                  href="tel:029-886-7913"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-background-50 text-foreground-700 font-semibold text-base hover:bg-background-200 transition-colors border border-background-300/70 whitespace-nowrap"
                >
                  <i className="ri-phone-line"></i>
                  029-886-7913
                </a>
              </div>
            </div>

            {/* Right: Fire Insurance */}
            <div className="bg-accent-50 rounded-xl p-5 md:p-6 border-2 border-accent-200/60 relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent-200/60 rounded-full blur-2xl"></div>

              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-accent-500 rounded-lg">
                    <i className="ri-fire-line text-background-50 text-base"></i>
                  </div>
                  <h3 className="font-heading text-lg md:text-xl font-bold text-accent-800">
                    火災保険の活用もご提案
                  </h3>
                </div>

                <p className="text-base text-foreground-700 leading-relaxed mb-3">
                  外壁・屋根の修理には<strong>火災保険が適用</strong>されるケースがあります。
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-accent-500 mt-0.5"></i>
                    <span className="text-sm md:text-base text-foreground-700">
                      <strong>風災保障</strong>が付帯している場合、台風・強風による損傷が補償対象に
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="ri-checkbox-circle-fill text-accent-500 mt-0.5"></i>
                    <span className="text-sm md:text-base text-foreground-700">
                      飛来物が外壁や屋根に衝突した<strong>突発的な事故</strong>も補償される可能性
                    </span>
                  </div>
                </div>

                <p className="text-sm text-accent-700 font-semibold flex items-center gap-1">
                  <i className="ri-information-line"></i>
                  保険適用の可否も無料で診断します
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}