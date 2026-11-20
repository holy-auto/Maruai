// コラムの公開日（2026.11.20 の形）
export function formatPostDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  // サーバーは UTC で動くので、日本時間の日付にそろえる
  const parts = new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(d);
  const get = (t: string) => parts.find((x) => x.type === t)?.value ?? '';
  return `${get('year')}.${get('month')}.${get('day')}`;
}

export function PostDate({ iso, className = '' }: { iso: string; className?: string }) {
  return (
    <time dateTime={iso} className={`inline-flex items-center gap-1.5 text-sm text-ink-2 ${className}`}>
      <i className="ri-calendar-line text-muted" aria-hidden="true"></i>
      <span className="font-figure tabular-nums">{formatPostDate(iso)}</span>
    </time>
  );
}
