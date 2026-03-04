import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Nutritionists from '@/components/Nutritionists';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Nutritionists />
      <Footer />
    </main>
  );
}
