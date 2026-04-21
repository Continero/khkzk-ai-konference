import { JarvisBackground } from "@/components/JarvisBackground";
import { Navigation } from "@/components/Navigation";
import { RegistrationModalProvider } from "@/components/RegistrationModal";
import { Hero } from "@/components/sections/Hero";
import { Countdown } from "@/components/sections/Countdown";
import { About } from "@/components/sections/About";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { RobotAnalysis } from "@/components/sections/RobotAnalysis";
import { Topics } from "@/components/sections/Topics";
import { Speakers } from "@/components/sections/Speakers";

import { Program } from "@/components/sections/Program";
import { Venue } from "@/components/sections/Venue";
import { Registration } from "@/components/sections/Registration";
import { Partners } from "@/components/sections/Partners";
import { Exhibitors } from "@/components/sections/Exhibitors";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <RegistrationModalProvider>
      <main className="relative">
        <JarvisBackground />
        <Navigation />
        <div className="relative z-10">
          <Hero />
          <Countdown />
          <About />
          <Topics />
          <Gallery />
          <Testimonials />
          <Speakers />
          <RobotAnalysis />
          <Exhibitors />
          <Program />
          <Venue />
          <Registration />
          <Partners />
          <Footer />
        </div>
      </main>
    </RegistrationModalProvider>
  );
}
