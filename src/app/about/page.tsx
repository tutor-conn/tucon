'use client'

import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import React from "react";
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";

export default function Home() {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleMouseEnter = () => {
    setIsOpen(true);
  }
  const handleMouseLeave = () => {
    setIsOpen(false);
  }
  
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section>
          <div className="container">
            <div className="flex flex-col justify-center">
              <Image
                alt="Tucon Logo"
                className="w-[45%] mx-auto m-12 rounded-lg shadow-lg"
                src="/student_and_tutor.jpg"
                priority
                height="100"
                width="550"
              />
              <h1 className="mx-auto font-bold text-4xl tracking-tighter text-secondary">Our Mission</h1>
              <p className="w-[75%] mx-auto text-center text-xl">
                Our goal is to provide a platform that seamlessly connects University of Guelph students with qualified tutors. 
                We aim to simplify the tutor search process and provide a space where students can easily discover, chat, and engage with tutors.
              </p>
              <h1 className="mx-auto font-bold text-4xl tracking-tighter text-secondary mt-12">Our Team</h1>
              <Image
                alt="Tucon Logo"
                className="w-[45%] mx-auto m-4 rounded-lg shadow-lg"
                src="/team_photo.jpg"
                priority
                height="100"
                width="550"
              />
              <div className="flex">
                <div className="flex flex-col gap-2">
                  <Popover 
                    isOpen={isOpen} 
                    onOpenChange={(open) => setIsOpen(open)} 
                    placement="bottom"
                    motionProps={{variants: {enter: {}, exit: {},},}}
                  >
                    <PopoverTrigger
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Button>Open Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="px-1 py-2">
                        <div className="text-small font-bold">Popover Content</div>
                        <div className="text-tiny">This is the popover content</div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <p className="text-small text-default-400">Open: {isOpen ? "true" : "false"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
