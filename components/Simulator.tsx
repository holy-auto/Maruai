'use client';
import { useState, type CSSProperties } from 'react';

const GRADES = [
  { name: 'ウレタン塗装', stars: 1, base25: 65 },
  { name: 'シリコン塗装', stars: 2, base25: 75 },
  { name: 'ラジカル塗装', stars: 3, base25: 85 },
  { name: 'フッ素塗装', stars: 4, base25: 95 },
  { name: '無機塗装', stars: 5, base25: 105 },
];
const BASE_FIXED = 15, REF = 25, ROOF = 0.7, CB = 3, CP = 0.35, TAX = 1.1;
const PRESETS = [20, 25, 30, 35, 40, 50];
const LINE = 'https://line.me/ti/p/UxXZqXMSWE';
const TEL = 'tel:0298867913';

function Stars({ n }: { n: number }) {
  return (
    <>
      {'★'.repeat(n)}
      <span className="off">{'★'.repeat(5 - n)}</span>
    </>
  );
}

export function Simulator() {
  const [tsubo, setTsubo] = useState(25);
  const [grade, setGrade] = useState(1);
  const [roof, setRoof] = useState(false);
  const [caulk, setCaulk] = useState(false);

  const clamp = (v: number) => Math.max(10, Math.min(70, v || 10));
  const g = GRADES[grade];
  const wall = BASE_FIXED + (g.base25 - BASE_FIXED) * (tsubo / REF);
  const r = roof ? tsubo * ROOF : 0;
  const c = caulk ? CB + tsubo * CP : 0;
  const total = wall + r + c;
  const rM = (n: number) => Math.round(n);
  const r1 = (n: number) => Math.round(n * 10) / 10;
  const fill = { '--p': `${((tsubo - 10) / 60) * 100}%` } as CSSProperties;

  return (
    <section className="alt psim">
      <div className="wrap">
        <div className="sec-head reveal">
          <span className="eyebrow">かんたん概算シミュレーター</span>
          <h2 className="mincho">坪数とグレードで、<span className="brush">その場で</span>概算がわかる。</h2>
          <p>正確な金額は無料の現地診断で。まずはおおよその目安をどうぞ。</p>
        </div>
        <div className="sim-grid">
          <div className="panel">
            <div className="field">
              <div className="flabel"><span className="t">延床面積</span><span className="hint">わからなければ目安でOK</span></div>
              <div className="tsubo-row">
                <div className="tsubo-num">
                  <input type="number" min={10} max={70} value={tsubo} onChange={(e) => setTsubo(clamp(Number(e.target.value)))} />
                  <span className="u">坪</span>
                </div>
                <input type="range" min={10} max={70} step={1} value={tsubo} style={fill} onChange={(e) => setTsubo(Number(e.target.value))} />
              </div>
              <div className="scale-help"><span>10坪</span><span>標準的な戸建て（25〜35坪）</span><span>70坪</span></div>
              <div className="presets">
                {PRESETS.map((p) => (
                  <button type="button" key={p} className={`preset${tsubo === p ? ' on' : ''}`} onClick={() => setTsubo(p)}>{p}坪</button>
                ))}
              </div>
            </div>

            <div className="field">
              <div className="flabel"><span className="t">塗料グレード</span><span className="hint">耐久年数が変わります</span></div>
              <div className="sgrades">
                {GRADES.map((gr, i) => (
                  <div key={gr.name} className={`sgrade${grade === i ? ' on' : ''}`} onClick={() => setGrade(i)}>
                    <div className="gl"><div className="jp">{gr.name.replace('塗装', '')}</div></div>
                    <div className="sstars"><Stars n={gr.stars} /></div>
                  </div>
                ))}
              </div>
              <p className="ghint">迷ったら、人気の「シリコン」か「ラジカル」が目安です。長く持たせたいなら上位グレードを。</p>
            </div>

            <div className="field">
              <div className="flabel"><span className="t">追加工事</span><span className="hint">必要なものだけ</span></div>
              <div className="opt">
                <div className="ol"><div className="t">屋根塗装</div><div className="d">外壁と一緒なら足場代がムダになりません</div></div>
                <label className="switch"><input type="checkbox" checked={roof} onChange={(e) => setRoof(e.target.checked)} /><span className="slider" /></label>
              </div>
              <div className="opt">
                <div className="ol"><div className="t">コーキング打ち替え</div><div className="d">目地のひび割れ・劣化の補修</div></div>
                <label className="switch"><input type="checkbox" checked={caulk} onChange={(e) => setCaulk(e.target.checked)} /><span className="slider" /></label>
              </div>
            </div>
          </div>

          <div className="result">
            <div className="rlabel">概算金額の目安</div>
            <div className="grade-now mincho">{g.name}</div>
            <div className="stars-now"><Stars n={g.stars} /></div>
            <div className="total"><span className="approx">約</span><span className="yen">{rM(total).toLocaleString()}</span><span className="man">万円</span></div>
            <div className="tax">（税込 約 <b>{r1(total * TAX).toLocaleString()}</b> 万円・足場代込み／税抜表示）</div>
            <div className="breakdown">
              <div className="brow"><span>外壁塗装（{g.name}・{tsubo}坪）</span><span className="v">約{rM(wall)}万円</span></div>
              {roof && <div className="brow"><span>屋根塗装</span><span className="v">約{rM(r)}万円</span></div>}
              {caulk && <div className="brow"><span>コーキング打ち替え</span><span className="v">約{rM(c)}万円</span></div>}
              <div className="brow free"><span>高圧洗浄</span><span className="v">込み（無償）</span></div>
            </div>
            <div className="insure">🛡 台風・強風などによる傷みは、<b>火災保険の風災補償</b>が使える場合があります。診断は無料です。</div>
            <div className="cta-col">
              <a className="sbtn sbtn-line" href={LINE}>この内容でLINE相談（無料）</a>
              <a className="sbtn sbtn-tel" href={TEL}>電話で相談 029-886-7913</a>
            </div>
            <p className="disc">これはおおよその概算です。お住まいの形状・劣化状況・付帯部によって変わります。正確な金額は無料の現地診断でご提示します。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
