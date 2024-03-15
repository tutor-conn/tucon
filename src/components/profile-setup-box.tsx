import Image from "next/image";
import Link from "next/link";

export function ProfileSetupBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center gap-6">
      <Link href="/">
        <Image
          src="/tucon-horizontal.svg"
          alt="Tucon Logo"
          width={0}
          height={0}
          priority
          className="w-52 h-auto"
        />
      </Link>
      <div className="w-156 rounded-lg shadow-lg bg-white border border-gray-200 dark:border-gray-700">
        {children}
      </div>
    </div>
  );
}
