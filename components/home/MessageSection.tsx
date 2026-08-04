'use client';
import { useEffect, useRef, useState } from "react";

const storyCards = [
  {
    icon: "ri-bank-line",
    image:
      "https://readdy.ai/api/search-image?query=Warm%20inviting%20Japanese%20family%20home%20in%20quiet%20suburban%20neighborhood%20with%20soft%20golden%20hour%20sunlight%2C%20the%20well%20maintained%20house%20exterior%20emphasizes%20the%20value%20and%20importance%20of%20protecting%20ones%20home%20through%20professional%20exterior%20painting%20and%20renovation%2C%20editorial%20photography%20style%20with%20natural%20warm%20colors%20and%20gentle%20shadows%2C%20clean%20simple%20background%20with%20subtle%20greenery%2C%20emotional%20connection%20to%20home%20ownership%20and%20family%20security&width=600&height=400&seq=maruai-msg-card-01&orientation=landscape",
    title: "100万円の重み",
    text: "3年〜5年かけて貯めた大切なお金。そのお金で外壁塗装を行うからこそ、業者選びは慎重に。",
  },
  {
    icon: "ri-user-search-line",
    image:
      "https://readdy.ai/api/search-image?query=Professional%20scene%20of%20thoughtful%20Japanese%20person%20carefully%20reviewing%20home%20renovation%20documents%20and%20contractor%20comparison%20sheets%20at%20clean%20wooden%20desk%2C%20two%20contrasting%20folders%20representing%20different%20contractor%20choices%20visible%2C%20natural%20window%20lighting%20creating%20soft%20shadows%2C%20editorial%20photography%20style%20with%20warm%20neutral%20tones%2C%20simple%20uncluttered%20background%2C%20conveying%20careful%20decision%20making%20and%20importance%20of%20choosing%20trustworthy%20home%20service%20providers&width=600&height=400&seq=maruai-msg-card-02&orientation=landscape",
    title: "業者選びの現実",
    text: "「面倒だから」と訪問業者に任せていませんか？支払った金額がしっかり施工に反映される業者を。",
  },
  {
    icon: "ri-building-2-line",
    image:
      "https://readdy.ai/api/search-image?query=Close%20up%20detailed%20editorial%20shot%20of%20professional%20exterior%20house%20wall%20painting%20work%20in%20progress%2C%20skilled%20craftsman%20hands%20applying%20fresh%20paint%20with%20precision%20roller%20on%20textured%20wall%20surface%2C%20professional%20painting%20tools%20and%20materials%20visible%20in%20soft%20focus%20background%2C%20natural%20daylight%20outdoor%20lighting%2C%20warm%20editorial%20photography%20tones%2C%20craftsmanship%20quality%20and%20meticulous%20attention%20to%20detail%20clearly%20evident&width=600&height=400&seq=maruai-msg-card-03&orientation=landscape",
    title: "現場で見た真実",
    text: "高額でも品質が伴わない現実を数多く目撃。「お客様の期待に真っ直ぐ応えたい」と独立を決意。",
  },
  {
    icon: "ri-hand-heart-line",
    image:
      "https://readdy.ai/api/search-image?query=Warm%20professional%20handshake%20between%20Japanese%20construction%20company%20representative%20in%20clean%20work%20uniform%20and%20satisfied%20smiling%20homeowner%20standing%20in%20front%20of%20beautifully%20freshly%20painted%20house%20exterior%2C%20genuine%20smiles%20and%20mutual%20trust%20visible%2C%20soft%20natural%20golden%20hour%20lighting%20creating%20warm%20welcoming%20atmosphere%2C%20editorial%20portrait%20photography%20style%2C%20simple%20clean%20background%2C%20conveying%20trust%20reliability%20and%20personal%20commitment&width=600&height=400&seq=maruai-msg-card-04&orientation=landscape",
    title: "丸愛装業の約束",
    text: "見積〜施工〜アフターまで代表が全責任。小さな会社だからこそ一件一件に真心を込めて。",
  },
];

export default function MessageSection() {
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="message" className="w-full py-14 md:py-20 bg-background-100">
      <div className="w-full px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block text-accent-500 text-base font-semibold tracking-widest uppercase mb-2">
            Message
          </span>
          <h4 className="font-heading text-3xl md:text-5xl font-bold text-foreground-900 mb-3">
            <a href="#message">代表からのメッセージ</a>
          </h4>
        </div>

        {/* CEO Intro Row */}
        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 mb-12 md:mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="md:col-span-2">
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20Japanese%20construction%20company%20owner%20in%20work%20uniform%20shaking%20hands%20with%20satisfied%20customer%20in%20front%20of%20beautifully%20painted%20house%2C%20trust%20and%20friendship%2C%20warm%20smile%2C%20professional%20photography%2C%20golden%20hour%20lighting%2C%20high%20quality&width=800&height=600&seq=maruai-message-01&orientation=landscape"
                alt="茨城県阿見町 丸愛装業 代表取締役 小林力也"
                title="茨城県阿見町の塗装専門店 丸愛装業 代表取締役 小林力也"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="md:col-span-3 flex flex-col justify-center">
            <p className="text-xl md:text-2xl font-heading font-bold text-foreground-900 mb-1">
              株式会社丸愛装業
            </p>
            <p className="text-lg font-heading text-foreground-700 mb-6">
              代表取締役{" "}
              <span className="text-primary-500 font-bold">小林力也</span>
            </p>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl bg-accent-100 flex flex-col items-center justify-center">
                <span className="text-2xl md:text-3xl font-bold text-accent-600 leading-none">
                  100
                </span>
                <span className="text-[10px] font-semibold text-accent-500">
                  万円
                </span>
              </div>
              <div>
                <p className="text-sm md:text-base text-foreground-700 leading-relaxed">
                  皆さんは
                  <strong className="text-foreground-900">100万円</strong>
                  を貯めるのに、どのくらいの時間がかかりますか？
                </p>
                <p className="text-sm md:text-base text-foreground-600 leading-relaxed mt-1">
                  今の物価では
                  <strong className="text-foreground-900">3年〜5年</strong>
                  かかる方も。その大切なお金で行う外壁塗装、
                  <strong className="text-foreground-900">
                    本当に信頼できる業者
                  </strong>
                  に任せられていますか？
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Story Cards with Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-12">
          {storyCards.map((card, index) => (
            <div
              key={index}
              className={`bg-background-50 rounded-xl border border-background-200/70 overflow-hidden transition-all duration-500 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              {/* Card Header Image */}
              <div className="w-full h-32 md:h-36">
                <img
                  src={card.image}
                  alt={card.title}
                  title={card.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Card Body */}
              <div className="p-4 md:p-5">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-accent-100 flex items-center justify-center mb-3">
                  <i
                    className={`${card.icon} text-lg md:text-xl text-accent-600`}
                  ></i>
                </div>
                <h5 className="font-heading text-sm md:text-base font-bold text-foreground-900 mb-1.5">
                  {card.title}
                </h5>
                <p className="text-xs md:text-sm text-foreground-600 leading-relaxed">
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing + Signature */}
        <div
          className={`bg-background-50 rounded-xl p-5 md:p-8 border border-background-200/70 transition-all duration-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <p className="text-sm md:text-base text-foreground-700 leading-relaxed mb-4">
            このホームページをご覧くださったすべての方が、
            <strong className="text-foreground-900">
              信頼できる塗装業者
            </strong>
            と出会えることを願っております。そして、もしご縁がありましたら、
            <strong className="text-foreground-900">丸愛装業</strong>
            にもお気軽にご相談ください。お家を守る
            <strong className="text-foreground-900">大切な工事</strong>
            、全力でお手伝いさせていただきます。
          </p>
          <p className="text-right font-heading text-lg md:text-xl font-bold text-foreground-900">
            代表取締役 小林力也
          </p>
        </div>
      </div>
    </section>
  );
}