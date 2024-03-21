"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AuthBox } from "@/components/auth-box";
import { Anchor } from "@/components/ui/anchor";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TUCON_API_URL } from "@/lib/constants";

const formSchema = z.object({
  firstName: z.string().min(1, "Please enter your first name").max(64),
  lastName: z.string().min(1, "Please enter your last name").max(64),
  email: z.string().email("Please enter a valid email").max(128),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(128),
});

export default function SignUp() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await fetch(`${TUCON_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => router.push("/create-profile"))
      .catch((error) => toast.error("Error: " + error));
  }

  return (
    <AuthBox>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6 p-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Sign up</h1>
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <p className="text-center">
              Already have an account?{" "}
              <Anchor variant="primary" href="/login">
                Log in
              </Anchor>
            </p>

            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Sign up
            </Button>

            <p className="text-center text-xs text-gray-500">
              By signing up, you agree to our{" "}
              <Anchor href="/legal/terms-of-service">terms of service</Anchor>{" "}
              and <Anchor href="/legal/privacy-policy">privacy policy</Anchor>
            </p>
          </div>
        </form>
      </Form>
    </AuthBox>
  );
}
