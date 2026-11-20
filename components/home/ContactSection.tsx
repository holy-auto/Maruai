'use client';
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase";

// 電話か、LINEか、フォームか。：左に電話・LINE・会社の情報（#company）、右にフォーム（Form）
// ご依頼の流れ（/services の流れと同じ内容）
const FLOW = [
  { t: "ご相談", d: "LINE・電話・フォームからお気軽に。", icon: "ri-chat-3-line" },
  { t: "現地診断", d: "代表が直接、外壁・屋根を点検します。", icon: "ri-search-eye-line" },
  { t: "お見積り", d: "内訳の明確な、適正価格をご提示。", icon: "ri-file-list-3-line" },
  { t: "施工", d: "自社の職人が、丁寧に塗り上げます。", icon: "ri-paint-brush-line" },
  { t: "アフター", d: "最長10年保証で、その後も安心。", icon: "ri-shield-check-line" },
];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // /price など別ページのシミュレーターから引き継いだ概算をフォームに反映する
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = sessionStorage.getItem("maruai-estimate");
      if (saved) sessionStorage.removeItem("maruai-estimate");
    } catch {
      /* ストレージ不可の場合は何もしない */
    }
    if (!saved) return;
    const estimateInput = document.getElementById("estimate-field") as HTMLInputElement | null;
    if (estimateInput) estimateInput.value = saved;
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
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
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const estimate = String(formData.get("estimate") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    try {
      const { error: insertError } = await supabase.from("contact_submissions").insert({
        source: "home",
        name,
        email,
        message,
        payload: { phone, estimate },
      });

      if (!insertError) {
        setSubmitted(true);
        form.reset();
        setCharCount(0);
      } else {
        setError("送信に失敗しました。お手数ですがお電話・LINEでのお問い合わせをご検討ください。");
      }
    } catch {
      setError("送信に失敗しました。お手数ですがお電話・LINEでのお問い合わせをご検討ください。");
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
    <section id="contact" className="bg-paper py-[var(--section-gap)]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6 items-end">
          <div className="md:col-span-6"><p className="eyebrow">Contact</p><h2 className="mt-4">電話か、LINEか、フォームか。</h2></div>
          <p className="lead md:col-span-6">
            ご相談はどのような事でもお気軽にどうぞ。お問い合わせは、3営業日以内に返信させていただきます。
          </p>
        </div>

        {/* ご依頼の流れ：アイコンと番号を矢印でつないだ5ステップ */}
        <ol className="mt-[var(--space-2xl)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-0">
          {FLOW.map((f, i) => (
            <li key={f.t} className="relative flex lg:flex-col items-start lg:items-center gap-4 lg:gap-3 lg:text-center lg:px-4">
              {/* つなぎの線（lg 以上） */}
              {i < FLOW.length - 1 && (
                <span aria-hidden="true" className="hidden lg:block absolute top-9 left-[calc(50%+44px)] right-[calc(-50%+44px)] h-px bg-[repeating-linear-gradient(90deg,var(--color-ink-2)_0_6px,transparent_6px_12px)]"></span>
              )}
              <span className="relative shrink-0 grid place-items-center w-[72px] h-[72px] rounded-full bg-plate border border-paper-3 shadow-card text-ink">
                <i className={`${f.icon} text-[1.75rem]`} aria-hidden="true"></i>
                <span className="absolute -top-1 -right-1 grid place-items-center w-7 h-7 rounded-full bg-accent text-accent-ink font-figure font-bold text-sm">{i + 1}</span>
              </span>
              <span>
                <span className="block font-display font-bold text-[1.25rem] text-ink">{f.t}</span>
                <span className="block mt-1 text-sm text-ink-2 leading-relaxed">{f.d}</span>
              </span>
            </li>
          ))}
        </ol>

        <div ref={sectionRef} className="mt-[var(--space-2xl)] grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12">
          {/* 左：電話・LINE と会社の情報 */}
          <div className="lg:col-span-5">
            <div className="border-t-bar border-ink pt-6">
              <h3>お電話でのお問い合わせ</h3>
              <dl className="mt-4 grid grid-cols-[3.5em_1fr] items-baseline gap-y-2">
                <dt className="label">TEL</dt>
                <dd>
                  <a href="tel:029-886-7913" className="link font-figure font-bold text-[clamp(1.75rem,2.5vw,2.5rem)] no-underline hover:underline">
                    029-886-7913
                  </a>
                </dd>
                <dt className="label">FAX</dt>
                <dd className="font-figure text-xl text-ink">029-886-5499</dd>
              </dl>
              <p className="mt-4 text-base text-ink-2">
                お電話でのお問い合わせは、平日朝9時から夜18時まで受け付けております。
              </p>
              <a
                href="https://line.me/ti/p/UxXZqXMSWE"
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="btn btn--secondary mt-6"
              >
                <i className="ri-line-fill text-xl" aria-hidden="true"></i>
                LINEで相談する
              </a>
            </div>

            <div id="company" className="mt-12 border-t-bar border-ink pt-6 scroll-mt-[var(--space-xl)]">
              <h3>会社概要</h3>
              <dl className="mt-4 text-base">
                {[
                  ["社名", "株式会社 丸愛装業"],
                  ["所在地", "〒300-0325 茨城県稲敷郡阿見町上条888"],
                  ["代表取締役", "小林力也"],
                  ["所属団体", "一般社団法人 全国優良リフォーム会員"],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[6.5em_1fr] gap-x-4 py-3 border-b border-paper-3">
                    <dt className="label">{k}</dt>
                    <dd className="text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                <li>
                  <a
                    href="https://line.me/ti/p/UxXZqXMSWE"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="link inline-flex items-center gap-1.5"
                  >
                    <i className="ri-line-fill text-lg" aria-hidden="true"></i>
                    公式LINE（LINEで友達追加）
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/maruaisougyou"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="link inline-flex items-center gap-1.5"
                  >
                    <i className="ri-instagram-line text-lg" aria-hidden="true"></i>
                    Instagram（@maruaisougyou）
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* 右：フォーム */}
          <div className="lg:col-span-6 lg:col-start-7 rounded-card bg-plate border border-paper-3 shadow-card p-6 md:p-10">
            <h3>メールでのお問い合わせ</h3>

            {submitted ? (
              <div className="mt-6 rounded-card bg-paper-2 p-6 md:p-8" role="status">
                <p className="text-title font-bold text-ink">お問い合わせを送信しました</p>
                <p className="mt-2 text-base text-ink-2">
                  お返事までしばらくお待ちください。
                  <br />
                  3営業日以内にご連絡いたします。
                </p>
                <button type="button" onClick={() => setSubmitted(false)} className="btn btn--secondary mt-6">
                  新規のお問い合わせ
                </button>
              </div>
            ) : (
              <form
                id="maruai-contact-form"
                ref={formRef}
                onSubmit={handleSubmit}
                className="mt-6 space-y-5"
              >
                <div>
                  <label htmlFor="name" className="label block mb-1.5">
                    お名前 <span className="text-ink">*</span>
                  </label>
                  <input type="text" id="name" name="name" required autoComplete="name" className="field" placeholder="山田 太郎" />
                </div>

                <div>
                  <label htmlFor="email" className="label block mb-1.5">
                    メールアドレス <span className="text-ink">*</span>
                  </label>
                  <input type="email" id="email" name="email" required autoComplete="email" inputMode="email" className="field" placeholder="example@email.com" />
                </div>

                <div>
                  <label htmlFor="phone" className="label block mb-1.5">
                    電話番号 <span className="text-ink">*</span>
                  </label>
                  <input type="tel" id="phone" name="phone" required autoComplete="tel" inputMode="tel" className="field" placeholder="029-1234-5678" />
                </div>

                <div>
                  <label htmlFor="estimate-field" className="label block mb-1.5">
                    見積もりシミュレーション結果
                  </label>
                  <input
                    type="text"
                    id="estimate-field"
                    name="estimate"
                    readOnly
                    className="field"
                    placeholder="シミュレーション結果が自動入力されます"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="label block mb-1.5">
                    お問い合わせ内容 <span className="text-ink">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    maxLength={500}
                    onChange={handleTextareaChange}
                    className="field resize-y"
                    placeholder="ご質問やご相談内容をご記入ください"
                  ></textarea>
                  <p className="mt-1 label text-right tabular-nums">{charCount}/500文字</p>
                </div>

                <p className="label">
                  送信いただいた内容は
                  <a href="/privacy" target="_blank" rel="noopener" className="link">プライバシーポリシー</a>
                  に従って取り扱います。内容をご確認のうえ送信してください。
                </p>

                {error && (
                  <p className="text-base font-medium text-error border-l-bar border-error pl-3" role="alert">
                    {error}
                  </p>
                )}

                <button type="submit" disabled={sending} aria-busy={sending} className="btn btn--primary w-full">
                  {sending ? (
                    <>
                      <i className="ri-loader-4-line animate-spin" aria-hidden="true"></i>
                      送信中...
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-line" aria-hidden="true"></i>
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
