"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventType, useForm } from "react-hook-form";
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
import { useState, ChangeEvent } from "react";
import { cities, countries, courses, languages } from "@/lib/autofill-data";
import { ImageSelector } from "@/components/image-selector";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectItem, Chip } from "@nextui-org/react";

const phoneRegex = new RegExp(/(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

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
    .regex(phoneRegex, "Invalid phone number")
    .optional(),
  additionalEmail: z.string().email().optional(),
  meetingPreferences: z.string(),
  aboutMe: z.string().max(256, "Max of 256 characters.").optional(),
  // backgroundExperience: for tutor only?
});

export default function CreateStudent() {
  const [payRange, setPayRange] = useState<number[]>([15, 40]);
  const [phoneVal, setPhoneVal] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      gender: "",
      additionalEmail: "",
      // payRange: [0, 0],
      country: "",
      city: "",
      meetingPreferences: "",
      aboutMe: "",
    },
  });

  function formatPhoneNumber(phone: string): string {
    const digitsOnly = phone.replace(/\D/g, "");
    let formattedPhone = digitsOnly;

    // Add parentheses around the first three digits
    if (digitsOnly.length > 3) {
      formattedPhone = `(${formattedPhone.substring(0, 3)}) ${formattedPhone.substring(3)}`;
    }

    if (digitsOnly.length > 6) {
      formattedPhone = `${formattedPhone.substring(0, 9)} - ${formattedPhone.substring(9)}`;
    }

    return formattedPhone;
  }

  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    const value: string = e.target ? e.target.value : "";

    if (
      (phoneRegex.test(value) && value.length <= 16) ||
      value.length < phoneVal.length
    ) {
      const formatted = formatPhoneNumber(value);
      setPhoneVal(formatted);
    }
  }

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
            <div className="w-256">
              <div className="grid grid-cols-2 gap-6">
                <ImageSelector
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  className="row-span-3 w-[95%]"
                />

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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <Input
                        {...field}
                        value={phoneVal}
                        onChange={handlePhoneChange}
                      />
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

                {/* TODO: add little info button to understand what it is for */}
                <FormField
                  control={form.control}
                  name="additionalEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-5 mt-10 text-center">
                <h1 className="text-3xl font-bold">Student Details</h1>
                <p className="mx-auto mt-1 block text-center text-sm">
                  This information will be used to find you the best possible
                  tutors.
                </p>
              </div>

              <Slider
                label="Preferred Tutor Pay Rate *"
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

              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    // maybe use ComboBox instead
                    <Autocomplete
                      label="Country *"
                      labelPlacement={"outside"}
                      placeholder=" "
                      defaultItems={countries}
                      className="mx-auto mb-10 mt-[15px] block h-10 w-full"
                      variant="bordered"
                      classNames={{
                        base: "[&>*>*>*]:border [&>*>*>*]:border-input",
                      }}
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
                  name="city"
                  render={({ field }) => (
                    <Autocomplete
                      label="City *"
                      labelPlacement={"outside"}
                      placeholder="Where do you prefer to meet?"
                      defaultItems={cities}
                      className="mx-auto mb-10 mt-[15px] block h-10 w-full"
                      variant="bordered"
                      classNames={{
                        base: "[&>*>*>*]:border [&>*>*>*]:border-input",
                      }}
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

                <Select
                  label="Courses *"
                  selectionMode="multiple"
                  labelPlacement={"outside"}
                  placeholder=" "
                  className="mx-auto mb-6 mt-[15px] block h-10 w-full"
                  classNames={{
                    mainWrapper: "border rounded-[4px]",
                    trigger: "border rounded-[4px]",
                  }}
                  variant="bordered"
                  scrollShadowProps={{ isEnabled: false }}
                  items={courses}
                  renderValue={(items) => {
                    return (
                      <div className="flex gap-2">
                        {items.map((item) => (
                          <Chip key={item.key}>{item.textValue}</Chip>
                        ))}
                      </div>
                    );
                  }}
                >
                  {courses.map((course) => (
                    <SelectItem key={course.key}>{course.label}</SelectItem>
                  ))}
                </Select>

                <FormField
                  control={form.control}
                  name="meetingPreferences"
                  render={({ field }) => (
                    <FormItem className="row-span-2 ml-2 space-y-3">
                      <FormLabel>I Prefer to Meet...</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="all" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              In Person
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="mentions" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Remotely
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="none" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              No Preference
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Select
                  label="Languages *"
                  selectionMode="multiple"
                  labelPlacement={"outside"}
                  placeholder="What Languages do you speak?"
                  className="mx-auto mb-10 mt-[15px] block h-10 w-full"
                  classNames={{
                    mainWrapper: "border rounded-[4px]",
                    trigger: "border rounded-[4px]",
                  }}
                  variant="bordered"
                  scrollShadowProps={{ isEnabled: false }}
                  items={languages}
                  renderValue={(items) => {
                    return (
                      <div className="flex gap-2">
                        {items.map((item) => (
                          <Chip key={item.key}>{item.textValue}</Chip>
                        ))}
                      </div>
                    );
                  }}
                >
                  {languages.map((language) => (
                    <SelectItem key={language.key}>{language.label}</SelectItem>
                  ))}
                </Select>
              </div>
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
              // onClick={onSubmit}
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
