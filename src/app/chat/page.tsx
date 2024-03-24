"use client";
import { ChatSidebar } from "@/components/chat/sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ChatPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedChat = searchParams.get("selected");

  function onSelectChat(userId: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("selected", userId);
    router.push(pathname + "?" + params.toString());
  }

  return (
    <div className="flex h-[100dvh] flex-col">
      <div className="flex shrink-0 flex-col">
        <SiteHeader />
        <div className="border-t" />
      </div>

      <div className="hidden flex-1 sm:block">
        <DesktopChat selectedChat={selectedChat} onSelectChat={onSelectChat} />
      </div>

      <div className="block flex-1 sm:hidden">
        <MobileChat selectedChat={selectedChat} onSelectChat={onSelectChat} />
      </div>
    </div>
  );
}

interface DesktopChatProps {
  selectedChat: string | null;
  onSelectChat: (userId: string) => void;
}

function DesktopChat(props: DesktopChatProps) {
  return (
    <div className="relative h-full">
      <ResizablePanelGroup direction="horizontal" className="absolute h-full">
        <ResizablePanel
          defaultSize={20}
          minSize={10}
          maxSize={50}
          className="min-w-72"
        >
          <ScrollArea className="h-full">
            <ChatSidebar />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <Chat />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

interface MobileChatProps {
  selectedChat: string | null;
  onSelectChat: (userId: string) => void;
}

function MobileChat(props: MobileChatProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="relative h-full">
      <div className="absolute h-full w-full">
        <ScrollArea className="h-full">
          {isChatOpen ? <Chat /> : <ChatSidebar />}
        </ScrollArea>
      </div>
    </div>
  );
}

function SidebarChatToggle() {}

function Chat() {
  return <div className="h-full bg-blue-50">TODO: Chat Section</div>;
}
