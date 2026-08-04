'use client';
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { examples } from "@/lib/examples";

const commonCategories = [
  "すべて",
  "外壁塗装",
  "屋根塗装",
  "コーキング・外壁塗装",
  "防水工事・外壁塗装",
  "外壁・屋根塗装",
  "屋根塗装・コーキング",
  "外壁塗装・防水工事",
];

export default function ExampleGrid() {
  const [activeCategory, setActiveCategory] = useState("すべて");
  const [visibleCount, setVisibleCount] = useState(6);
  const [currentSlide, setCurrentSlide] = useState<Record<string, "before" | "after">>(() => {
    const initial: Record<string, "before" | "after"> = {};
    examples.forEach((ex) => {
      initial[ex.id] = "after";
    });
    return initial;
  });
  const router = useRouter();

  const filteredExamples = activeCategory === "すべて"
    ? examples
    : examples.filter((ex) => ex.category === activeCategory);

  const displayedExamples = filteredExamples.slice(0, visibleCount);
  const hasMore = visibleCount < filteredExamples.length;

  useEffect(() => {
    setVisibleCount(6);
    const initial: Record<string, "before" | "after"> = {};
    examples.forEach((ex) => {
      initial[ex.id] = "after";
    });
    setCurrentSlide(initial);
  }, [activeCategory]);

  const toggleSlide = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setCurrentSlide((prev) => ({
      ...prev,
      [id]: prev[id] === "before" ? "after" : "before",
    }));
  };

  const goToDetail = (id: string) => {
    router.push(`/works/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <section id="examples-grid" className="w-full py-14 md:py-20 bg-background-100">
      <div className="w-full px-4 md:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-block text-accent-500 text-base font-semibold tracking-widest uppercase mb-2">
            Our works
          </span>
          <h4 className="font-heading text-3xl md:text-5xl font-bold text-foreground-900 mb-3">
            <a href="#examples-grid">施工事例一覧</a>
          </h4>
          <p className="text-foreground-600 text-base md:text-lg max-w-2xl mx-auto">
            お客様にご満足いただいた<strong>施工事例</strong>の数々です。
            <strong>ビフォーアフター</strong>で仕上がりの違いをぜひご確認ください。
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8 md:mb-10">
          {commonCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-base font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-primary-500 text-background-50"
                  : "bg-background-50 text-foreground-700 border border-background-300/60 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {displayedExamples.map((example) => {
            const CardWrapper = ({ example: ex }: { example: typeof examples[0] }) => {
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
                <div
                  ref={ref}
                  onClick={() => goToDetail(ex.id)}
                  className={`bg-background-50 rounded-xl overflow-hidden border border-background-200/70 hover:border-primary-300 transition-all duration-700 cursor-pointer ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                >
                  <div className="relative h-48 md:h-52 overflow-hidden group cursor-pointer" onClick={(e) => toggleSlide(e, ex.id)}>
                    <img
                      src={currentSlide[ex.id] === "before" ? ex.beforeImage : ex.afterImage}
                      alt={currentSlide[ex.id] === "before" ? `${ex.title} 施工前` : `${ex.title} 施工後`}
                      title={`茨城県 ${ex.location} 塗装施工事例 丸愛装業 - ${ex.title}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
                        currentSlide[ex.id] === "before"
                          ? "bg-foreground-700/80 text-background-100"
                          : "bg-accent-500/90 text-background-50"
                      }`}>
                        {currentSlide[ex.id] === "before" ? "施工前" : "施工後"}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="px-3 py-1 rounded-full bg-background-50/90 text-foreground-700 text-sm font-medium whitespace-nowrap">
                        クリックで切替
                      </span>
                    </div>
                  </div>

                  <div className="p-4 md:p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold whitespace-nowrap">
                        {ex.category}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg md:text-xl font-bold text-foreground-900 mb-2 leading-snug">
                      {ex.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-foreground-500 mb-3">
                      <span className="flex items-center gap-1">
                        <i className="ri-map-pin-line text-sm"></i>
                        {ex.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-home-4-line text-sm"></i>
                        {ex.area}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="ri-calendar-line text-sm"></i>
                        {ex.period}
                      </span>
                    </div>
                    <p className="text-base text-foreground-600 leading-relaxed mb-3 line-clamp-3">
                      {ex.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {ex.features.map((feat) => (
                        <span key={feat} className="px-2 py-0.5 rounded bg-secondary-100 text-secondary-800 text-sm whitespace-nowrap">
                          {feat}
                        </span>
                      ))}
                    </div>
                    <div className="bg-background-100 rounded-lg p-3 border border-background-200/70">
                      <div className="flex items-start gap-2">
                        <i className="ri-double-quotes-l text-accent-400 text-base shrink-0 mt-0.5"></i>
                        <p className="text-sm text-foreground-600 leading-relaxed italic">
                          {ex.testimonial}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            };

            return <CardWrapper key={example.id} example={example} />;
          })}
        </div>

        {filteredExamples.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 flex items-center justify-center bg-background-50 rounded-full mx-auto mb-4 border border-background-200/70">
              <i className="ri-image-line text-foreground-400 text-2xl"></i>
            </div>
            <p className="text-foreground-500 text-base">
              該当する施工事例がまだありません。
            </p>
          </div>
        )}

        {hasMore && (
          <div className="text-center mt-8 md:mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-8 py-3 rounded-full bg-background-50 text-foreground-700 border border-background-300/60 text-base font-semibold hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300 transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              もっと見る
              <i className="ri-arrow-down-s-line ml-1 align-middle"></i>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export { commonCategories };