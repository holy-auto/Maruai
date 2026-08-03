'use client';
import { useState, useRef, useEffect } from "react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && sectionRef.current) {
          sectionRef.current.classList.add("opacity-100", "translate-y-0");
          sectionRef.current.classList.remove("opacity-0", "translate-y-6");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSending(true);

    const form = formRef.current;
    if (!form) {
      setSending(false);
      return;
    }

    const formData = new FormData(form);
    const data = new URLSearchParams();
    formData.forEach((value, key) => {
      data.append(key, String(value));
    });

    try {
      const response = await fetch("https://readdy.ai/api/form/d8kgf43sisn5c04b3ih0", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
        setCharCount(0);
      } else {
        setError("送信に失敗しました。時間をおいて再度お試しください。");
      }
    } catch {
      setError("送信に失敗しました。電話でのお問い合わせをご検討ください。");
    } finally {
      setSending(false);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setCharCount(value.length);
    } else {
      e.target.value = value.slice(0, 500);
      setCharCount(500);
    }
  };

  return (
    <section id="contact" className="w-full py-14 md:py-20 bg-background-100">
      <div className="w-full px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block text-accent-500 text-base font-semibold tracking-widest uppercase mb-2">
            Contact Us
          </span>
          <h4 className="font-heading text-3xl md:text-5xl font-bold text-foreground-900 mb-3">
            <a href="#contact">お問い合わせ</a>
          </h4>
          <p className="text-foreground-600 text-base md:text-lg max-w-2xl mx-auto mb-6">
            ご相談はどのような事でもお気軽にどうぞ。
            <br />
            お問い合わせは、3営業日以内に返信させていただきます。
          </p>
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 opacity-0 translate-y-6 transition-all duration-700"
        >
          <div className="bg-background-50 rounded-xl p-6 md:p-8 border border-background-200/70">
            <h3 className="font-heading text-xl font-bold text-foreground-900 mb-4">
              お電話でのお問い合わせ
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-lg border border-primary-200/50">
                <div className="w-10 h-10 flex items-center justify-center bg-primary-500 rounded-full text-background-50">
                  <i className="ri-phone-line text-lg"></i>
                </div>
                <div>
                  <p className="text-sm text-foreground-500">TEL</p>
                  <a
                    href="tel:029-886-7913"
                    className="text-lg font-bold text-primary-700 hover:text-primary-800"
                  >
                    029-886-7913
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-secondary-50 rounded-lg border border-secondary-200/50">
                <div className="w-10 h-10 flex items-center justify-center bg-secondary-500 rounded-full text-background-50">
                  <i className="ri-printer-line text-lg"></i>
                </div>
                <div>
                  <p className="text-sm text-foreground-500">FAX</p>
                  <p className="text-lg font-bold text-foreground-800">
                    029-886-5499
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-base text-foreground-600">
              お電話でのお問い合わせは、平日朝9時から夜18時まで受け付けております。
            </p>
            <div className="mt-6 space-y-3">
              <a
                href="https://line.me/ti/p/UxXZqXMSWE"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 bg-green-500 rounded-lg text-background-50 hover:bg-green-600 transition-colors"
              >
                <i className="ri-line-fill text-xl"></i>
                <span className="text-base font-semibold">LINEで相談する</span>
              </a>
            </div>
          </div>

          <div className="bg-background-50 rounded-xl p-6 md:p-8 border border-background-200/70">
            <h3 className="font-heading text-xl font-bold text-foreground-900 mb-4">
              メールでのお問い合わせ
            </h3>

            {submitted ? (
              <div className="bg-primary-50 rounded-lg p-6 text-center border border-primary-200/50">
                <div className="w-12 h-12 flex items-center justify-center bg-primary-500 rounded-full text-background-50 mx-auto mb-3">
                  <i className="ri-check-line text-xl"></i>
                </div>
                <p className="text-lg font-bold text-foreground-900 mb-2">
                  お問い合わせを送信しました
                </p>
                <p className="text-base text-foreground-600">
                  お返事までしばらくお待ちください。
                  <br />
                  3営業日以内にご連絡いたします。
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2.5 rounded-full bg-primary-500 text-background-50 text-base font-semibold hover:bg-primary-600 transition-colors"
                >
                  新規のお問い合わせ
                </button>
              </div>
            ) : (
              <form
                id="maruai-contact-form"
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-4"
                data-readdy-form
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-base font-semibold text-foreground-700 mb-1"
                  >
                    お名前 <span className="text-accent-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-background-200/70 bg-background-50 text-base text-foreground-800 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                    placeholder="山田 太郎"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-base font-semibold text-foreground-700 mb-1"
                  >
                    メールアドレス <span className="text-accent-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-background-200/70 bg-background-50 text-base text-foreground-800 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-base font-semibold text-foreground-700 mb-1"
                  >
                    電話番号 <span className="text-accent-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-background-200/70 bg-background-50 text-base text-foreground-800 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
                    placeholder="029-1234-5678"
                  />
                </div>

                <div>
                  <label
                    htmlFor="estimate-field"
                    className="block text-base font-semibold text-foreground-700 mb-1"
                  >
                    見積もりシミュレーション結果
                  </label>
                  <input
                    type="text"
                    id="estimate-field"
                    name="estimate"
                    readOnly
                    className="w-full px-4 py-3 rounded-lg border border-background-200/70 bg-background-100 text-base text-foreground-600 focus:outline-none"
                    placeholder="シミュレーション結果が自動入力されます"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-base font-semibold text-foreground-700 mb-1"
                  >
                    お問い合わせ内容 <span className="text-accent-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    maxLength={500}
                    onChange={handleTextareaChange}
                    className="w-full px-4 py-3 rounded-lg border border-background-200/70 bg-background-50 text-base text-foreground-800 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 resize-none"
                    placeholder="ご質問やご相談内容をご記入ください"
                  ></textarea>
                  <p className="mt-1 text-sm text-foreground-500 text-right">
                    {charCount}/500文字
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200/50">
                    <p className="text-base text-red-700">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-primary-500 text-background-50 font-bold text-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <i className="ri-loader-4-line animate-spin"></i>
                      送信中...
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-line"></i>
                      上記内容で送信する
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}