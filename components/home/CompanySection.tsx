'use client';
import { useEffect, useRef, useState } from "react";

export default function CompanySection() {
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
    <section id="company" className="w-full py-14 md:py-20 bg-background-50">
      <div className="w-full px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block text-accent-500 text-base font-semibold tracking-widest uppercase mb-2">
            Corporate profile
          </span>
          <h4 className="font-heading text-3xl md:text-5xl font-bold text-foreground-900 mb-3">
            <a href="#company">会社概要</a>
          </h4>
        </div>

        <div
          ref={ref}
          className={`bg-background-100 rounded-xl p-6 md:p-8 border border-background-200/70 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          itemScope
          itemType="https://schema.org/LocalBusiness"
        >
          <meta itemProp="url" content="https://www.maruai-sougyo.com" />
          <meta itemProp="image" content="https://readdy.ai/api/search-image?query=Beautiful%20modern%20Japanese%20house%20exterior%20with%20fresh%20paint%20after%20renovation%2C%20warm%20sunlight%2C%20clean%20blue%20sky%2C%20well-maintained%20residential%20street%20in%20Japan%2C%20professional%20photography%2C%20high%20quality%2C%20serene%20atmosphere%2C%20green%20garden%20and%20trees&width=1600&height=900&seq=maruai-hero-01&orientation=landscape" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <dl className="space-y-4">
                <div className="flex border-b border-background-200/70 pb-3">
                  <dt className="w-32 text-base font-semibold text-foreground-700 shrink-0">
                    社名
                  </dt>
                  <dd className="text-base text-foreground-800" itemProp="name"><strong>株式会社 丸愛装業</strong></dd>
                </div>
                <div className="flex border-b border-background-200/70 pb-3" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <dt className="w-32 text-base font-semibold text-foreground-700 shrink-0">
                    所在地
                  </dt>
                  <dd className="text-base text-foreground-800">
                    <span itemProp="postalCode">〒300-0325</span>
                    <br />
                    <span itemProp="addressRegion">茨城県</span><span itemProp="addressLocality">稲敷郡阿見町</span><span itemProp="streetAddress">上条888</span>
                  </dd>
                </div>
                <div className="flex border-b border-background-200/70 pb-3">
                  <dt className="w-32 text-base font-semibold text-foreground-700 shrink-0">
                    電話
                  </dt>
                  <dd className="text-base text-foreground-800">
                    <a
                      href="tel:029-886-7913"
                      className="text-primary-600 hover:text-primary-700 font-semibold"
                      itemProp="telephone"
                    >
                      029-886-7913
                    </a>
                  </dd>
                </div>
                <div className="flex border-b border-background-200/70 pb-3">
                  <dt className="w-32 text-base font-semibold text-foreground-700 shrink-0">
                    FAX
                  </dt>
                  <dd className="text-base text-foreground-800" itemProp="faxNumber">029-886-5499</dd>
                </div>
                <div className="flex border-b border-background-200/70 pb-3">
                  <dt className="w-32 text-base font-semibold text-foreground-700 shrink-0">
                    代表取締役
                  </dt>
                  <dd className="text-base text-foreground-800">小林力也</dd>
                </div>
              </dl>
            </div>
            <div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-background-50 rounded-lg border border-background-200/70">
                  <div className="w-16 h-16 flex items-center justify-center bg-green-500 rounded-lg shrink-0">
                    <i className="ri-line-fill text-background-50 text-2xl"></i>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-foreground-800">公式LINE</p>
                    <a
                      href="https://line.me/ti/p/UxXZqXMSWE"
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="text-base text-primary-600 hover:text-primary-700"
                    >
                      LINEで友達追加
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-background-50 rounded-lg border border-background-200/70">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shrink-0">
                    <i className="ri-instagram-line text-background-50 text-2xl"></i>
                  </div>
                  <div>
                    <p className="text-base font-semibold text-foreground-800">Instagram</p>
                    <a
                      href="https://www.instagram.com/maruaisougyou"
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="text-base text-primary-600 hover:text-primary-700"
                    >
                      @maruaisougyou
                    </a>
                  </div>
                </div>
                <div className="p-4 bg-background-50 rounded-lg border border-background-200/70">
                  <p className="text-base font-semibold text-foreground-800 mb-2">
                    所属団体
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-primary-100 rounded-md text-primary-600">
                      <i className="ri-award-line text-lg"></i>
                    </div>
                    <p className="text-base text-foreground-700">
                      一般社団法人 全国優良リフォーム会員
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}