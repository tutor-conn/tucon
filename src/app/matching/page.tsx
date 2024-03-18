"use client"; //for the event handlers
import { SiteHeader } from "@/components/site-header";
import { TutorCard } from "@/components/tutor-card";

export default function MatchingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="pt-8">
          <div className="flex justify-center">
            <TutorCard />
          </div>
        </section>
      </main>
    </div>
  );
}
