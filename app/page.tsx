import HeroSection from '@/components/home/HeroSection';
import ServiceSection from '@/components/home/ServiceSection';
import MoneyFlowSection from '@/components/home/MoneyFlowSection';
import SimulationSection from '@/components/home/SimulationSection';
import ReasonSection from '@/components/home/ReasonSection';
import MessageSection from '@/components/home/MessageSection';
import ContactSection from '@/components/home/ContactSection';

// 会話型FAQ：各セクションの見出しが施主の質問。会社概要（#company）はお問い合わせの中にまとめた。
export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <ServiceSection />
      <MoneyFlowSection />
      <SimulationSection />
      <ReasonSection />
      <MessageSection />
      <ContactSection />
    </main>
  );
}
