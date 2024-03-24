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
import { Anchor } from "@/components/ui/anchor";
import { toast } from "sonner";
import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
  Chip,
} from "@nextui-org/react";
import { useState, ChangeEvent } from "react";
import { cities, countries, courses, languages } from "@/lib/autofill-data";
import { ImageSelector } from "@/components/image-selector";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { asOptionalString, formatPhoneNumber } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Page, PageHeader, PageTitle } from "@/components/ui/page";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";

const phoneRegex = new RegExp(/(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);
const payRegex = new RegExp(/^\d{1,3}(\.\d{0,2})?$/);

const formSchema = z.object({
  firstName: z.string().min(1, "Please enter your first name"),
  lastName: z.string().min(1, "Please enter your last name"),
  phone: z
    .string()
    .optional()
    .refine(
      (val: string | undefined) => {
        return (
          val === undefined ||
          val === "" ||
          (phoneRegex.test(val) && val.length == 16)
        );
      },
      { message: "Please enter a valid phone number" },
    ),
  gender: asOptionalString(z.string()),
  additionalEmail: asOptionalString(z.string().email()),
  payRate: z
    .string()
    .min(1, "Please enter an hourly rate")
    .regex(payRegex, "Please enter a valid number")
    .refine((value) => {
      return Number(value) <= 200;
    }, "Please enter a smaller value"),
  country: z.string().min(1, "Please enter a country"),
  city: z.string().min(1, "Please enter a city"),
  courses: z.array(z.string()).min(1, "Please select at least one course"),
  languages: z.array(z.string()).min(1, "Please select at least one Language"),
  meetingPreferences: z.enum(["in person", "remote", "none"], {
    required_error: "You need to select a meeting preference",
  }),
  // aboutMe: asOptionalString(z.string().max(256, "Max of 256 characters.")),
  // backgroundExperience: tutor only?
});

export default function CreateTutor() {
  // const router = useRouter();

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
      payRate: "",
      country: "",
      city: "",
      courses: [],
      languages: [],
      meetingPreferences: undefined,
      // aboutMe: "",
    },
  });

  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    const value: string = e.target ? e.target.value : "";
    const phoneVal: string = form.getValues("phone") as string;

    if (
      (phoneRegex.test(value) && value.length <= 16) ||
      value.length < phoneVal.length
    ) {
      const formatted = formatPhoneNumber(value);
      form.setValue("phone", formatted);
    }
  }

  function handlePayRateChange(e: ChangeEvent<HTMLInputElement>) {
    const value: string = e.target ? e.target.value : "";

    if (payRegex.test(value) || value === "") {
      form.setValue("payRate", value);
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);

    // TODO: Call API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.error("Not Implemented!");
    // toast.success("Profile Created!");
    // router.push("/chat");
  }

  return (
    <div className="flex min-h-[100dvh] flex-col bg-gray-100">
      <SiteHeader />
      <Page className="mb-20 max-w-4xl">
        <PageHeader>
          <PageTitle>Create Your Tutor Profile</PageTitle>
        </PageHeader>
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <div className="w-256">
                    <div className="mb-8 text-center">
                      <h1 className="text-3xl font-bold">
                        Contact Information
                      </h1>
                      <p className="mx-auto mt-1 block text-center text-sm">
                        This information will be used to identify and contact
                        you.
                      </p>
                    </div>

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
                            <FormControl>
                              <Input {...field} onChange={handlePhoneChange} />
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

                      {/* TODO: add little info button to understand what it is for */}
                      <FormField
                        control={form.control}
                        name="additionalEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Alternate Contact Email</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mb-5 mt-10 text-center">
                      <h1 className="text-3xl font-bold">Tutor Details</h1>
                      <p className="mx-auto mt-1 block text-center text-sm">
                        This information will be used match you with the best
                        students.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          // maybe use ComboBox instead
                          <FormItem>
                            <Autocomplete
                              {...field}
                              label="Country *"
                              labelPlacement={"outside"}
                              placeholder="What country do you live in?"
                              defaultItems={countries}
                              className="mx-auto mt-[15px] block h-10 w-full"
                              variant="bordered"
                              classNames={{
                                base: "[&>*>*>*]:border [&>*>*>*]:border-input",
                              }}
                              disableAnimation={true}
                              allowsCustomValue={true}
                              scrollShadowProps={{
                                isEnabled: false,
                              }}
                              onInputChange={(val) => {
                                form.setValue("country", val);
                              }}
                            >
                              {(item) => (
                                <AutocompleteItem key={item.key}>
                                  {item.label}
                                </AutocompleteItem>
                              )}
                            </Autocomplete>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <Autocomplete
                              {...field}
                              label="City *"
                              labelPlacement={"outside"}
                              placeholder="Where do you prefer to meet?"
                              defaultItems={cities}
                              className="mx-auto mt-[15px] block h-10 w-full"
                              variant="bordered"
                              classNames={{
                                base: "[&>*>*>*]:border [&>*>*>*]:border-input",
                              }}
                              disableAnimation={true}
                              allowsCustomValue={true}
                              scrollShadowProps={{
                                isEnabled: false,
                              }}
                              onInputChange={(val) => {
                                form.setValue("city", val);
                              }}
                            >
                              {(item) => (
                                <AutocompleteItem key={item.key}>
                                  {item.label}
                                </AutocompleteItem>
                              )}
                            </Autocomplete>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="courses"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              {...field}
                              label="Courses *"
                              selectionMode="multiple"
                              labelPlacement={"outside"}
                              placeholder="What Courses do you want help with?"
                              className="mx-auto mt-[15px] block h-10 w-full"
                              classNames={{
                                mainWrapper: "border rounded-[4px]",
                                trigger: "border rounded-[4px]",
                              }}
                              variant="bordered"
                              disableAnimation={true}
                              scrollShadowProps={{ isEnabled: false }}
                              onChange={(e) => {
                                form.setValue(
                                  "courses",
                                  e.target?.value.split(","),
                                );
                              }}
                              items={courses}
                              renderValue={(items) => {
                                return (
                                  <div className="flex gap-2">
                                    {items.map((item) => (
                                      <Chip key={item.key}>
                                        {item.textValue}
                                      </Chip>
                                    ))}
                                  </div>
                                );
                              }}
                            >
                              {courses.map((course) => (
                                <SelectItem key={course.key}>
                                  {course.label}
                                </SelectItem>
                              ))}
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="languages"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              {...field}
                              label="Languages *"
                              selectionMode="multiple"
                              labelPlacement={"outside"}
                              placeholder="What Languages do you speak?"
                              className="mx-auto mt-[15px] block h-10 w-full"
                              classNames={{
                                mainWrapper: "border rounded-[4px]",
                                trigger: "border rounded-[4px]",
                              }}
                              variant="bordered"
                              disableAnimation={true}
                              scrollShadowProps={{ isEnabled: false }}
                              onChange={(e) => {
                                form.setValue(
                                  "languages",
                                  e.target?.value.split(","),
                                );
                              }}
                              items={languages}
                              renderValue={(items) => {
                                return (
                                  <div className="flex gap-2">
                                    {items.map((item) => (
                                      <Chip key={item.key}>
                                        {item.textValue}
                                      </Chip>
                                    ))}
                                  </div>
                                );
                              }}
                            >
                              {languages.map((language) => (
                                <SelectItem key={language.key}>
                                  {language.label}
                                </SelectItem>
                              ))}
                            </Select>
                            <FormMessage className="mb-2" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="payRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hourly Rate (CAD) *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                value={String(form.getValues("payRate") ?? "")}
                                onChange={handlePayRateChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="meetingPreferences"
                        render={({ field }) => (
                          <FormItem className="ml-2 space-y-3">
                            <FormLabel>I Prefer to Meet...</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="in person" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    In Person
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="remote" />
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
                    </div>
                  </div>

                  <p className="mx-auto block text-center">
                    Not looking to Tutor?{" "}
                    <Anchor variant="primary" href="/create-profile/student">
                      Be a Student Instead.
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
          </CardContent>
        </Card>
      </Page>
    </div>
  );
}
