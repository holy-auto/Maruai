import HeroSection from '@/components/home/HeroSection';
import ServiceSection from '@/components/home/ServiceSection';
import MoneyFlowSection from '@/components/home/MoneyFlowSection';
import SimulationSection from '@/components/home/SimulationSection';
import ReasonSection from '@/components/home/ReasonSection';
import MessageSection from '@/components/home/MessageSection';
import CompanySection from '@/components/home/CompanySection';
import ContactSection from '@/components/home/ContactSection';

export default function Home() {
  return (
    <main className="relative scroll-smooth">
      <HeroSection />
      <ServiceSection />
      <MoneyFlowSection />
      <SimulationSection />
      <ReasonSection />
      <MessageSection />
      <CompanySection />
      <ContactSection />
    </main>
  );
}
