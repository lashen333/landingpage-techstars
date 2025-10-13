// src\app\page.tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Schedule from "@/components/Schedule";
import Sponsors from "@/components/Sponsors";
import FAQ from "@/components/FAQ";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";
import Team from "@/components/Team";
import MentorsJudges from "@/components/MentorsJudges";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Schedule />
        <Team />
        <MentorsJudges />
        <Sponsors />
        <FAQ />
        <WaitlistForm />
      </main>
      <Footer />
    </>
  );
}
