'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', tel: '', body: '' });

  async function submit() {
    if (!form.name || (!form.email && !form.tel)) {
      alert('お名前と、メールまたは電話番号をご記入ください。');
      return;
    }
    setState('sending');
    // ▼ 本番では Supabase に inquiries テーブルを作り、INSERTのRLSを設定して送信
    //    （あるいは Route Handler / メール送信に差し替え）
    const { error } = await supabase.from('inquiries').insert(form);
    setState(error ? 'error' : 'done');
  }

  if (state === 'done') {
    return (
      <div className="cform">
        <p className="mincho" style={{ fontSize: '1.2rem' }}>送信しました。</p>
        <p className="note">3営業日以内にご返信します。お急ぎの場合はお電話・LINEをご利用ください。</p>
      </div>
    );
  }

  return (
    <div className="cform">
      <div><label>お名前</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="山田 太郎" /></div>
      <div><label>メールアドレス</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="example@mail.com" /></div>
      <div><label>電話番号</label><input type="tel" value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} placeholder="090-0000-0000" /></div>
      <div><label>お問い合わせ内容</label><textarea rows={5} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="築年数・お住まいエリア・気になる症状などをお書きください" /></div>
      <button className="btn btn-ember" type="button" onClick={submit} disabled={state === 'sending'}>
        {state === 'sending' ? '送信中…' : 'この内容で送信する'}
      </button>
      {state === 'error' && <p className="note" style={{ color: 'var(--ember)' }}>送信に失敗しました。お手数ですがお電話・LINEをご利用ください。</p>}
      <p className="note">※ 送信には Supabase に inquiries テーブル（INSERT許可のRLS）が必要です。未設定ならLINE・電話が確実です。</p>
    </div>
  );
}
