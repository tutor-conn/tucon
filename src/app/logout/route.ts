import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function GET() {
  cookies().delete("session");
  redirect("/");
}
