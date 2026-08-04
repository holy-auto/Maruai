'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const inputClass =
  'w-full px-4 py-3 rounded-lg border border-background-200/70 bg-background-50 text-base text-foreground-800 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400';

export function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', tel: '', body: '' });

  async function submit() {
    if (!form.name || (!form.email && !form.tel)) {
      alert('お名前と、メールまたは電話番号をご記入ください。');
      return;
    }
    setState('sending');
    const { error } = await supabase.from('inquiries').insert(form);
    setState(error ? 'error' : 'done');
  }

  if (state === 'done') {
    return (
      <div className="bg-primary-50 rounded-xl border border-primary-200/60 p-6 md:p-8 text-center">
        <div className="w-12 h-12 flex items-center justify-center bg-primary-500 rounded-full text-background-50 mx-auto mb-3">
          <i className="ri-check-line text-xl"></i>
        </div>
        <p className="font-heading text-lg font-bold text-foreground-900 mb-2">送信しました。</p>
        <p className="text-base text-foreground-600">3営業日以内にご返信します。お急ぎの場合はお電話・LINEをご利用ください。</p>
      </div>
    );
  }

  return (
    <div className="bg-background-50 rounded-xl border border-background-200/70 p-6 md:p-8 space-y-4">
      <div>
        <label className="block text-base font-semibold text-foreground-700 mb-1">お名前 <span className="text-accent-500">*</span></label>
        <input type="text" className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="山田 太郎" />
      </div>
      <div>
        <label className="block text-base font-semibold text-foreground-700 mb-1">メールアドレス</label>
        <input type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="example@mail.com" />
      </div>
      <div>
        <label className="block text-base font-semibold text-foreground-700 mb-1">電話番号</label>
        <input type="tel" className={inputClass} value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} placeholder="090-0000-0000" />
      </div>
      <div>
        <label className="block text-base font-semibold text-foreground-700 mb-1">お問い合わせ内容</label>
        <textarea rows={5} className={`${inputClass} resize-none`} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="築年数・お住まいエリア・気になる症状などをお書きください" />
      </div>
      <button
        type="button"
        onClick={submit}
        disabled={state === 'sending'}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-primary-500 text-background-50 font-bold text-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state === 'sending' ? <><i className="ri-loader-4-line animate-spin"></i>送信中…</> : <><i className="ri-send-plane-line"></i>この内容で送信する</>}
      </button>
      {state === 'error' && <p className="text-base text-red-600">送信に失敗しました。お手数ですがお電話・LINEをご利用ください。</p>}
      <p className="text-sm text-foreground-500">※ 送信には Supabase に inquiries テーブル（INSERT許可のRLS）が必要です。未設定ならLINE・電話が確実です。</p>
    </div>
  );
}
