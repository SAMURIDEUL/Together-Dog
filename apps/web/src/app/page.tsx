import { HeroSection } from '@/components/landing/HeroSection';
import { ProcessSection } from '@/components/landing/ProcessSection';
import { RecommendSection } from '@/components/landing/RecommendSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ProcessSection />
      <RecommendSection />
    </main>
  );
}
