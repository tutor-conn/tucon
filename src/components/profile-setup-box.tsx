import Image from "next/image";
import Link from "next/link";

export function ProfileSetupBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 py-20">
      <Link href="/create-profile">
        <Image
          src="/tucon-horizontal.svg"
          alt="Tucon Logo"
          width={0}
          height={0}
          priority
          className="h-auto w-52"
        />
      </Link>
      <div className="w-full max-w-[700px] rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700">
        {children}
      </div>
    </div>
  );
}
