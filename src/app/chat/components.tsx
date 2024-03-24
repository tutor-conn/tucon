"use client";
import { ChatSidebar } from "./sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ChatSection } from "./chat";

export function Chat() {
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
    <>
      <div className="hidden flex-1 sm:block">
        <DesktopChat selectedChat={selectedChat} onSelectChat={onSelectChat} />
      </div>

      <div className="block flex-1 sm:hidden">
        <MobileChat selectedChat={selectedChat} onSelectChat={onSelectChat} />
      </div>
    </>
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
            <ChatSidebar
              selectedChat={props.selectedChat}
              onSelectChat={props.onSelectChat}
            />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <ChatSection selectedChat={props.selectedChat} />
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
          {isChatOpen ? (
            <ChatSection selectedChat={props.selectedChat} />
          ) : (
            <ChatSidebar
              selectedChat={props.selectedChat}
              onSelectChat={props.onSelectChat}
            />
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
