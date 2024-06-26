import { SiteHeader } from "@/components/site-header";
import { Chat } from "./components";
import { Suspense } from "react";

export const runtime = "edge";

export default function ChatPage() {
  return (
    <div className="flex h-[100dvh] flex-col">
      <div className="flex shrink-0 flex-col">
        <SiteHeader />
        <div className="border-t" />
      </div>

      <Suspense>
        <Chat />
      </Suspense>
    </div>
  );
}
