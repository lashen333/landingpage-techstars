// src\app\page.tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhoIsItFor from "@/components/WhoIsItFor";
import WhatToExpect from "@/components/WhatToExpect";
import EventSchedule from "@/components/EventSchedule";
import TicketsSection from "@/components/TicketsSection";
import ImpactStats from "@/components/ImpactStats";
import CountdownSection from "@/components/CountdownSection";

import Footer from "@/components/Footer";


export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ImpactStats />
        <CountdownSection />
        <WhoIsItFor />
        <WhatToExpect />
        <EventSchedule />
        <TicketsSection />
        
       
      </main>
      <Footer />
    </>
  );
}
