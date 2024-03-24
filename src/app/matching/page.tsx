"use client"; //for the event handlers
import { TutorCard } from "@/components/tutor-card";
import { Navbar } from "@/components/navbar";

export default function MatchingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar message={"isStudent"} />
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
