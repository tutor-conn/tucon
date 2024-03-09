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
import { useToast } from "@/components/ui/use-toast";
import { AuthBox } from "@/components/auth-box";
import Link from "next/link";
import { Anchor } from "@/components/ui/anchor";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Please enter a password"),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);

    // TODO: Call API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      variant: "destructive",
      title: "Not implemented!",
    });
  }

  return (
    <AuthBox>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6 p-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
            </div>
            <div className="space-y-2">
              <div className="space-y-2">
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
              </div>
              <div className="space-y-2">
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
            </div>

            <div className="flex justify-between">
              <Anchor href="/forgot-password">Forgot password?</Anchor>
              <Anchor href="/sign-up">Create an account</Anchor>
            </div>

            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Login
            </Button>
          </div>
        </form>
      </Form>
    </AuthBox>
  );
}
