'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

// 入力欄は globals.css の .field
const inputClass = 'field mt-2 block';

function Badge({ required }: { required?: boolean }) {
  return required ? (
    <span className="ml-2 rounded-[4px] bg-accent px-1.5 py-0.5 text-[0.6875rem] font-bold text-accent-ink align-middle">必須</span>
  ) : (
    <span className="ml-2 rounded-[4px] bg-paper-2 border border-paper-3 px-1.5 py-0.5 text-[0.6875rem] font-bold text-muted align-middle">任意</span>
  );
}

export function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', tel: '', body: '' });
  const [invalid, setInvalid] = useState('');

  async function submit() {
    if (!form.name || (!form.email && !form.tel)) {
      setInvalid('お名前と、メールアドレスまたは電話番号のどちらかをご記入ください。');
      return;
    }
    setInvalid('');
    setState('sending');
    const { error } = await supabase.from('contact_submissions').insert({
      source: 'contact',
      name: form.name,
      email: form.email,
      message: form.body,
      payload: { tel: form.tel },
    });
    setState(error ? 'error' : 'done');
  }

  if (state === 'done') {
    return (
      <div className="rounded-card bg-plate border border-paper-3 shadow-card p-6 md:p-10 text-center" role="status">
        <span className="mx-auto grid place-items-center w-14 h-14 rounded-full bg-accent text-accent-ink" aria-hidden="true">
          <i className="ri-check-line text-3xl"></i>
        </span>
        <p className="mt-4 font-display font-bold text-title text-ink">送信しました。ありがとうございます。</p>
        <p className="mt-3 text-base text-ink-2">3営業日以内にご返信します。お急ぎの場合はお電話・LINEをご利用ください。</p>
      </div>
    );
  }

  return (
    <div className="rounded-card bg-plate border border-paper-3 shadow-card p-6 md:p-10 space-y-6">
      <div>
        <p className="flex items-center gap-2 font-display font-bold text-title text-ink">
          <i className="ri-mail-line text-accent" aria-hidden="true"></i>
          フォームで相談する
        </p>
        <p className="mt-2 text-sm text-ink-2">メールアドレスか電話番号のどちらかがあれば、こちらからご連絡します。</p>
      </div>
      <div>
        <label htmlFor="contact-name" className="label">お名前<Badge required /></label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          aria-required="true"
          className={inputClass}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="山田 太郎"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="label">メールアドレス<Badge /></label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          className={inputClass}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="example@mail.com"
        />
      </div>
      <div>
        <label htmlFor="contact-tel" className="label">電話番号<Badge /></label>
        <input
          id="contact-tel"
          name="tel"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          className={inputClass}
          value={form.tel}
          onChange={(e) => setForm({ ...form, tel: e.target.value })}
          placeholder="090-0000-0000"
        />
      </div>
      <div>
        <label htmlFor="contact-body" className="label">お問い合わせ内容<Badge /></label>
        <textarea
          id="contact-body"
          name="body"
          rows={5}
          className={`${inputClass} resize-none`}
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          placeholder="築年数・お住まいエリア・気になる症状などをお書きください"
        />
      </div>
      {invalid && (
        <p role="alert" className="flex items-start gap-2 rounded-control border border-error px-4 py-3 text-sm font-medium text-error">
          <i className="ri-error-warning-line text-lg" aria-hidden="true"></i>
          <span>{invalid}</span>
        </p>
      )}
      <p className="text-sm text-ink-2">
        送信いただいた内容は
        <a href="/privacy" target="_blank" rel="noopener" className="link">プライバシーポリシー</a>
        に従って取り扱います。内容をご確認のうえ送信してください。
      </p>
      <button
        type="button"
        onClick={submit}
        disabled={state === 'sending'}
        aria-busy={state === 'sending'}
        className="btn btn--primary w-full"
      >
        {state === 'sending' ? <><i className="ri-loader-4-line animate-spin" aria-hidden="true"></i>送信中…</> : <><i className="ri-send-plane-line" aria-hidden="true"></i>この内容で送信する</>}
      </button>
      {state === 'error' && (
        <p role="alert" className="flex items-start gap-2 rounded-control border border-error px-4 py-3 text-sm font-medium text-error">
          <i className="ri-error-warning-line text-lg" aria-hidden="true"></i>
          <span>送信に失敗しました。お手数ですがお電話・LINEをご利用ください。</span>
        </p>
      )}
      <p className="text-xs text-muted">※ 送信がうまくいかない場合は、お電話・LINEでお問い合わせください。</p>
    </div>
  );
}
