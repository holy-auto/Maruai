import HeroSection from '@/components/home/HeroSection';
import MoneyFlowSection from '@/components/home/MoneyFlowSection';
import ServiceSection from '@/components/home/ServiceSection';
import SimulationSection from '@/components/home/SimulationSection';
import ReasonSection from '@/components/home/ReasonSection';
import WorksSection from '@/components/home/WorksSection';
import MessageSection from '@/components/home/MessageSection';
import AreaSection from '@/components/home/AreaSection';
import ContactSection from '@/components/home/ContactSection';

export const revalidate = 3600;

// 流れ：約束（ヒーロー）→ なぜ安いか → 何を頼めるか → いくらか → いつ塗るか → 実績 → 誰が塗るか → どこまで来るか → 相談
// 背景は 紺 → 白 → 薄茶 → 白 → 薄茶 → 白 → 紺 → 薄茶 → 白 と交互に
export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <MoneyFlowSection />
      <ServiceSection />
      <SimulationSection />
      <ReasonSection />
      <WorksSection />
      <MessageSection />
      <AreaSection />
      <ContactSection />
    </main>
  );
}
