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
import { ProfileSetupBox } from "@/components/profile-setup-box";
import { Anchor } from "@/components/ui/anchor";
import { toast } from "sonner";


const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );

const formSchema = z.object({
    firstName: z.string().min(1, "Please enter your first name"),
    lastName: z.string().min(1, "Please enter your last name"),
    hourlyRateMin: z.number().min(0, "Please enter a minimum rate").max(99, "Please enter a valid maximum rate"),
    hourlyRateMax: z.number().min(1, "Please enter a valid maximum rate").max(100, "Please enter a valid maximum rate"),
    location: z.string().min(1, "Please enter a location"),
    gender: z.string().optional(),
    phone: z.string().min(1, "Plese enter a phone number").regex(phoneRegex, "Invalid phone number"),
    additionalEmail: z.string().email().optional(),
    aboutMe: z.string().max(256, "Max of 256 characters.").optional(),
    // backgruoundExperience: for tutor only?
  });


export default function CreateStudent() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          firstName: "",
          lastName: "",
          hourlyRateMin: 0,
          hourlyRateMax: 0,
          location: "",
          gender: "",
          phone: "",
          additionalEmail: "",
          aboutMe: ""
        },
      });
    
      async function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data);
    
        // TODO: Call API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        toast.error("Not implemented!");
      }
    
      return (
        <ProfileSetupBox>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-6 p-6">
                <div className="space-y-2 text-center">
                  <h1 className="text-3xl font-bold">Create Your Student Profile</h1>
                </div>
                <div className="space-y-2">
                  <div className="grid" style={{gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
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
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
      
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Location</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Slider defaultValue={[25, 75]} />
                </div>
    
                <p className="text-center">
                  Want to create a tutor profile instead?<br/>
                  <Anchor variant="primary" href="/create-profile/tutor">
                    Be a Tutor
                  </Anchor>
                </p>
    
                <Button
                  className="w-full"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  Create Profile
                </Button>
    
                <p className="text-center text-gray-500 text-xs">
                  By creating an account, you agree to our{" "}
                  <Anchor href="/legal/terms-of-service">terms of service</Anchor>{" "}
                  and <Anchor href="/legal/privacy-policy">privacy policy</Anchor>
                </p>
              </div>
            </form>
          </Form>
        </ProfileSetupBox>
      );
}