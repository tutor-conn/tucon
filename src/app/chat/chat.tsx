"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChatMessage, tuconApi } from "@/lib/api";
import { cn, formatDate as formatDate, formatRelativeDate } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CornerDownLeft, Send } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ChatProps {
  selectedChat: string | null;
}

const messageFormSchema = z.object({
  message: z.string().min(1),
});

export function ChatSection(props: ChatProps) {
  const queryClient = useQueryClient();
  const { data: messages, isLoading } = useQuery({
    enabled: props.selectedChat !== null,
    queryKey: ["messages", props.selectedChat],
    queryFn: () => tuconApi.getChatMessages(props.selectedChat!),
    refetchInterval: 10000,
  });

  const sendChatMutation = useMutation({
    mutationFn: function sendMessage(message: string) {
      return tuconApi.sendChatMessage(props.selectedChat!, {
        body: { content: message },
      });
    },
    onMutate(message) {
      queryClient.setQueryData(
        ["messages", props.selectedChat!],
        (oldMessages: ChatMessage[]): ChatMessage[] => {
          return [
            ...oldMessages,
            {
              id: 1000000 + oldMessages.length + 1,
              content: message,
              from: "me",
              timestamp: new Date().toISOString(),
            },
          ];
        },
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["messages", props.selectedChat!],
      });
    },
  });

  const form = useForm({
    resolver: zodResolver(messageFormSchema),
    mode: "onSubmit",
    defaultValues: {
      message: "",
    },
  });

  function formSubmitCallback(values: { message: string }) {
    sendChatMutation.mutate(values.message);
    form.reset();
  }

  const onSubmitForm = form.handleSubmit(formSubmitCallback);

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSubmitForm();
    }
  }

  return (
    <div className="flex h-full flex-col-reverse bg-gray-100">
      <div className="border-t bg-card p-6">
        <form
          className="relative overflow-hidden rounded-lg border focus-within:ring-1 focus-within:ring-ring"
          onSubmit={onSubmitForm}
        >
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Type a message..."
            onKeyDown={handleKeyDown}
            {...form.register("message")}
            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0">
            <Button type="submit" size="sm" className="ml-auto gap-1.5">
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>

      <div className="flex flex-1">
        {messages && <Messages messages={messages} />}
      </div>
    </div>
  );
}

interface MessagesProps {
  messages: ChatMessage[];
}

function Messages({ messages }: MessagesProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useAutoscrollToLastMessage(messages, viewportRef);

  const reversedMessages = [...messages].reverse();
  return (
    <main className="relative flex-1">
      <div className="absolute h-full w-full">
        <ScrollAreaPrimitive.Root className="relative h-full overflow-hidden">
          <ScrollAreaPrimitive.Viewport
            ref={viewportRef}
            className="h-full w-full rounded-[inherit]"
          >
            <div className="flex flex-col-reverse gap-4 p-4">
              {reversedMessages.map((message) => (
                <Message key={message.id} message={message} />
              ))}
            </div>
          </ScrollAreaPrimitive.Viewport>
          <ScrollBar />
          <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
      </div>
    </main>
  );
}

function Message({ message }: { message: ChatMessage }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        message.from === "me" ? "items-end" : "items-start",
      )}
    >
      <span
        className={cn(
          "max-w-[80%] whitespace-pre rounded-2xl bg-card px-2 py-1.5 shadow-sm",
          message.from === "me" ? "bg-primary text-white" : "",
        )}
      >
        {message.content}
      </span>
      <Tooltip>
        <TooltipTrigger>
          <p className="text-xs text-gray-500">
            {formatRelativeDate(message.timestamp)}
          </p>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs text-gray-500">
            {formatDate(message.timestamp)}
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

function useAutoscrollToLastMessage(
  messages: ChatMessage[],
  viewportRef: React.RefObject<HTMLDivElement>,
) {
  const lastMessage = messages.at(-1);

  useEffect(() => {
    if (!viewportRef.current || !lastMessage?.from) {
      return;
    }

    const isViewportScrolledToBottom =
      viewportRef.current.scrollHeight - viewportRef.current.scrollTop ===
      viewportRef.current.clientHeight;

    if (!isViewportScrolledToBottom && lastMessage.from === "them") {
      return;
    }

    viewportRef.current.scrollTo({
      top: viewportRef.current.scrollHeight,
      behavior: "instant",
    });
  }, [viewportRef, lastMessage?.id, lastMessage?.from]);
}
