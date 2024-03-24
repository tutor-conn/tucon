import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const users = [
  {
    id: "1",
    name: "Alice Freeman",
    avatarUrl: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: "2",
    name: "Timothy Reynold",
    avatarUrl: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: "3",
    name: "Charlotte Mack",
    avatarUrl: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: "4",
    name: "Isabella Fisher",
    avatarUrl: "https://i.pravatar.cc/150?u=4",
  },
  {
    id: "5",
    name: "Kristopher Johnson",
    avatarUrl: "https://i.pravatar.cc/150?u=5",
  },
  { id: "6", name: "Amanda Young", avatarUrl: "https://i.pravatar.cc/150?u=6" },
  { id: "7", name: "Evelyn Green", avatarUrl: "https://i.pravatar.cc/150?u=7" },
  {
    id: "8",
    name: "Landon Rodriguez",
    avatarUrl: "https://i.pravatar.cc/150?u=8",
  },
  {
    id: "9",
    name: "Dylan Russell",
    avatarUrl: "https://i.pravatar.cc/150?u=9",
  },
  {
    id: "10",
    name: "Kaitlyn Anderson",
    avatarUrl: "https://i.pravatar.cc/150?u=10",
  },
  { id: "11", name: "Lila White", avatarUrl: "https://i.pravatar.cc/150?u=11" },
  {
    id: "12",
    name: "Jennifer Reid",
    avatarUrl: "https://i.pravatar.cc/150?u=12",
  },
  {
    id: "13",
    name: "Suzanne Taylor",
    avatarUrl: "https://i.pravatar.cc/150?u=13",
  },
  { id: "14", name: "John Ross", avatarUrl: "https://i.pravatar.cc/150?u=14" },
  {
    id: "15",
    name: "Don Gordon",
    avatarUrl: "https://i.pravatar.cc/150?u=15",
  },
  {
    id: "16",
    name: "Rebecca Stuart",
    avatarUrl: "https://i.pravatar.cc/150?u=16",
  },
];

interface ChatSidebarProps {
  selectedChat: string | null;
  onSelectChat: (userId: string) => void;
}

export function ChatSidebar(props: ChatSidebarProps) {
  return (
    <div className="flex flex-col">
      {users.map((user) => (
        <ContactCard
          key={user.id}
          name={user.name}
          avatarUrl={user.avatarUrl}
          isSelected={props.selectedChat === user.id}
          onClick={() => props.onSelectChat(user.id)}
        />
      ))}
    </div>
  );
}

interface ContactCardProps {
  name: string;
  avatarUrl: string;
  isSelected: boolean;
  onClick: () => void;
}

function ContactCard(props: ContactCardProps) {
  return (
    <button className="flex gap-4 border-b bg-card p-4" onClick={props.onClick}>
      <Avatar className="h-12 w-12">
        <AvatarImage src={props.avatarUrl} />
        <AvatarFallback />
      </Avatar>

      <p className="font-semibold">{props.name}</p>
    </button>
  );
}
