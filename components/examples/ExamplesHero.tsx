import { PageHero } from '@/components/site/PageHero';

// hero: Banner（PageHero）。生成画像と暗いスクリムをやめ、見出しと一文だけで立てる
export default function ExamplesHero() {
  return (
    <div id="examples-hero">
      <PageHero
        title="施工事例"
        description={
          <>
            <span className="inline-block">阿見町・牛久市・土浦市・つくば市を中心に、</span>
            <span className="inline-block">数多くの外壁塗装・屋根塗装を</span>
            <span className="inline-block">手掛けてきました。</span>
          </>
        }
      />
    </div>
  );
}
