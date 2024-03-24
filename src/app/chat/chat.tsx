"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChatMessage, tuconApi } from "@/lib/api";
import { cn, formatDate as formatDate, formatRelativeDate } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";

interface ChatProps {
  selectedChat: string | null;
}

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
              id: oldMessages.length + 1,
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
    defaultValues: {
      message: "",
    },
  });

  function onSubmitMessageForm(values: { message: string }) {
    sendChatMutation.mutate(values.message);
    form.reset();
  }

  return (
    <div className="flex h-full flex-col bg-gray-100">
      <div className="flex flex-1">
        {messages && <Messages messages={messages} />}
      </div>
      <form onSubmit={form.handleSubmit(onSubmitMessageForm)}>
        <div className="flex gap-4 border-t bg-card p-4">
          <Input
            placeholder="Type a message..."
            {...form.register("message")}
          />
          <Button size="icon" type="submit">
            <Send />
          </Button>
        </div>
      </form>
    </div>
  );
}

interface MessagesProps {
  messages: ChatMessage[];
}

function Messages({ messages }: MessagesProps) {
  return (
    <main className="relative flex-1">
      <div className="absolute h-full w-full">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-4 p-4">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>
        </ScrollArea>
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
      <div
        className={cn(
          "max-w-[80%] rounded-2xl bg-card px-2 py-1.5 shadow-sm",
          message.from === "me" ? "bg-primary text-white" : "",
        )}
      >
        {message.content}
      </div>
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
