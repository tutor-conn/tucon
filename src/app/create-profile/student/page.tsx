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
import { Autocomplete, AutocompleteItem, Slider } from "@nextui-org/react";
import { useState } from "react";
import { cities, countries } from "@/lib/autofill-data";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
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
  phone: z
    .string()
    .min(1, "Plese enter a phone number")
    .regex(phoneRegex, "Invalid phone number"),
  additionalEmail: z.string().email().optional(),
  aboutMe: z.string().max(256, "Max of 256 characters.").optional(),
  // backgroundExperience: for tutor only?
});

export default function CreateStudent() {
  const [payRange, setPayRange] = useState<number[]>([15, 40]);

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
      aboutMe: "",
    },
  });

  function formatPayRate(pay: number[]) {
    const min = pay[0];
    const max = pay[1];

    if (min == 0 && max >= 100) {
      return "Any Pay";
    }

    const suffix = max >= 100 ? "+/hr" : "/hr";

    if (min == max) {
      return `CAD $${min}.00` + suffix;
    }
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
          <div className="space-y-4 p-6">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold">
                Create Your Student Profile
              </h1>
            </div>
            <div className="w-256 space-y-6">
              <div
                className="grid"
                style={{ gridTemplateColumns: "2fr 2fr", gap: "15px" }}
              >
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
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
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
                name="payRange"
                // formatOptions={{style: "currency", currency: "CAD"}}
                step={1}
                maxValue={100}
                minValue={0}
                value={payRange}
                onChange={(value) => setPayRange(value as number[])}
                getValue={(value) => formatPayRate(value as number[])}
                className="mx-auto block w-[70%] py-6"
              />

              {/* <div className="grid grid-cols-2 gap-[15px]"> */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <Autocomplete
                    label="City *"
                    labelPlacement={"outside"}
                    placeholder="Where do you prefer to meet?"
                    defaultItems={cities}
                    className="mx-auto mt-[25px] block w-1/2 pb-[25px]"
                    allowsCustomValue={true}
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                    {...field}
                  >
                    {(item) => (
                      <AutocompleteItem key={item.key}>
                        {item.label}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <Autocomplete
                    label="Country *"
                    labelPlacement={"outside"}
                    placeholder=" "
                    defaultItems={countries}
                    className="mx-auto block w-1/2"
                    allowsCustomValue={true}
                    scrollShadowProps={{
                      isEnabled: false,
                    }}
                    {...field}
                  >
                    {(item) => (
                      <AutocompleteItem key={item.key}>
                        {item.label}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )}
              />
              {/* </div> */}
            </div>

            <p className="mx-auto block text-center">
              Not a Student?{" "}
              <Anchor variant="primary" href="/create-profile/tutor">
                Be a Tutor Instead.
              </Anchor>
            </p>

            <p className="mx-auto block text-center text-xs text-gray-500">
              * indicates a Required Field
            </p>

            <Button
              className="mx-auto block w-3/5"
              type="submit"
              onClick={onSubmit}
              disabled={form.formState.isSubmitting}
            >
              Create Profile
            </Button>
          </div>
        </form>
      </Form>
    </ProfileSetupBox>
  );
}
