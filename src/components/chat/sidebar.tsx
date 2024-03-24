import { Avatar, AvatarFallback } from "../ui/avatar";

export function ChatSidebar() {
  return (
    <div className="flex flex-col">
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
      <ContactCard />
    </div>
  );
}

function ContactCard() {
  return (
    <div className="border-b bg-card p-4">
      <Avatar className="h-16 w-16">
        <AvatarFallback />
      </Avatar>
    </div>
  );
}
