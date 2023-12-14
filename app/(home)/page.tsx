import Faq from "./_components/Faq";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";
import Plans from "./_components/Plans";
import Slider from "./_components/Slider";


export default function Home() {

  return (
    <main>
      <Navbar/>
      <Hero/>
      <Slider/>
      <Plans/>
      <Faq/>
      <Footer/>

    </main>
  )
}
