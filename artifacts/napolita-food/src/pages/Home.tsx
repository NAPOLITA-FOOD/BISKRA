import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ScrollStory from '../components/ScrollStory';
import MenuSection from '../components/MenuSection';
import PizzaBuilder from '../components/PizzaBuilder';
import DeliverySection from '../components/DeliverySection';
import Gallery from '../components/Gallery';
import ReservationSection from '../components/ReservationSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[var(--black)] text-[var(--white)] font-sans selection:bg-[var(--red)] selection:text-white">
      {/* Italian flag stripe — top */}
      <div className="fixed top-0 left-0 right-0 z-50 flex h-[3px]">
        <div className="flex-1 bg-[var(--green)]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[var(--red)]" />
      </div>

      <Navbar />
      <HeroSection />
      <ScrollStory />
      <MenuSection />
      <PizzaBuilder />
      <DeliverySection />
      <Gallery />
      <ReservationSection />
      <Footer />
    </div>
  );
}