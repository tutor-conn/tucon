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
  FormAutocomplete,
} from "@/components/ui/form";
import { ProfileSetupBox } from "@/components/profile-setup-box";
import { Anchor } from "@/components/ui/anchor";
import { toast } from "sonner";
import { Autocomplete, AutocompleteItem, Slider } from "@nextui-org/react";
import { useState } from "react";



const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  firstName: z.string().min(1, "Please enter your first name"),
  lastName: z.string().min(1, "Please enter your last name"),
  // TODO: make custom validation for payRange
  // payRange: z.number().min(0, "Please enter a minimum rate").max(99, "Please enter a valid maximum rate"),
  // location: z.string().min(1, "Please enter a location"),
  city: z.string().min(1, "Please enter a city"),
  country: z.string().min(1, "Please enter a country"),
  gender: z.string().optional(),
  phone: z.string().min(1, "Plese enter a phone number").regex(phoneRegex, "Invalid phone number"),
  additionalEmail: z.string().email().optional(),
  aboutMe: z.string().max(256, "Max of 256 characters.").optional(),
  // backgroundExperience: for tutor only?
});


export default function CreateStudent() {
  const [payRange, setPayRange] = useState<number[]>([25, 50]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      // payRange: [0, 0],
      city: "",
      country: "",
      gender: "",
      phone: "",
      additionalEmail: "",
      aboutMe: ""
    },
  });


  function onChangePay(value: number | number[]) {
    // check if it is an array of numbers
    if (Array.isArray(value) && value.every(item => typeof item === 'number')) {
      setPayRange(value);
    }
  }


  function formatPayRate(pay: any) {
    var min: number = Number(pay.valueOf()[0])
    var max: number = Number(pay.valueOf()[1]);
    var suffix: string = (max >= 100) ? "+" : "";
    return `CAD $${min}.00 - $${max}.00` + suffix;
  }


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
          <div className="space-y-4 p-6 w-500">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold">Create Your Student Profile</h1>
            </div>
            <div className="space-y-6">
              <div className="grid" style={{gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
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
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender Identity</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Slider 
                label="Select your preferred pay range *"
                // name="payRange"
                // formatOptions={{style: "currency", currency: "CAD"}}
                step={1}
                maxValue={100}
                minValue={0}
                value={payRange}
                onChange={onChangePay}
                getValue={formatPayRate}
                className="max-w-md py-6"
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <Autocomplete
                    label="City *"
                    // TODO: add city name values to a unique file
                    defaultItems={[{key: "lol", label: "lol"}, {key: "cringe", label: "cringe"}]}
                    className="max-w-xs"
                    allowsCustomValue={true}
                    scrollShadowProps={{
                      isEnabled: false
                    }}
                  >
                    {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                  </Autocomplete>
                )}
              />
            </div>

            <p className="text-center">
              Not a Student?{" "}
              <Anchor variant="primary" href="/create-profile/tutor">
                Be a Tutor Instead.
              </Anchor>
            </p>

            <p className="text-center text-gray-500 text-xs">* indicates a Required Field</p>

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