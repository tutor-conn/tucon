import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  async function login(formData: FormData) {
    "use server";

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = Object.fromEntries(formData.entries());
    console.log(data);
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <form action={login}>
        <div className="w-96 rounded-lg shadow-lg bg-white p-6 space-y-6 border border-gray-200 dark:border-gray-700">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
          </div>
          <div className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="m@example.com"
                required
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Password"
                required
                type="password"
              />
            </div>
          </div>

          <SubmitButton
            className="w-full bg-black text-white"
            variant="outline"
            type="submit"
          >
            <div className="flex items-center justify-center">Login</div>
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
