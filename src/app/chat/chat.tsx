import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export function ChatSection() {
  return (
    <main className="flex h-full flex-col bg-blue-50">
      <div className="flex-1" />
      <div className="flex gap-4 border-t bg-card p-4">
        <Input placeholder="Type a message..." />
        <Button size="icon">
          <Send />
        </Button>
      </div>
    </main>
  );
}
