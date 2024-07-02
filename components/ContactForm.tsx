"use client";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import sendMail from "@/lib/sendMail";

type Props = {
  dic: { [key: string]: string };
};

// Contact form component with form validation and email sending
export default function Contact({ dic }: Props) {
  // Zod schema for form validation inside the function do display localized error messages the user can understand
  const formSchema = z
    .object({
      name: z.string().min(2, { message: dic.req_name_message }),
      emailAddress: z.string().email({ message: dic.req_mail_message }),
      motivationType: z.enum(["personal", "business"], {
        errorMap: () => ({
          message: dic.req_select,
        }),
      }),
      companyName: z.string().optional(),
      message: z.string().min(10, { message: dic.req_message_message }),
      copy: z.boolean(),
    })
    .refine(
      (data) => {
        if (data.motivationType === "business") {
          return !!data.companyName;
        }
        return true;
      },
      {
        message: dic.req_company_message,
        path: ["companyName"],
      }
    );
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      emailAddress: "",
      companyName: "",
      message: "",
      motivationType: "personal",
      copy: false,
    },
  });
  const motivationType = form.watch("motivationType");

  // Email sending function
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await sendMail(values, dic.copy_subject);
    // display success message
    toast({
      description: dic.thanks_message,
    });
    // reset form
    form.reset();
    //Todo: the motivation Select is only resetting the value not the display so the user thinks he has already selected something
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>{dic.label_name}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={dic.placeholder_name}
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>{dic.label_mail}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={dic.placeholder_mail}
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="motivationType"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>{dic.label_motivation}</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={dic.placeholder_motivation} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="personal">{dic.personal}</SelectItem>
                      <SelectItem value="business">{dic.business}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {/* Only display companyName if motivationType is business */}
          {motivationType === "business" && (
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{dic.label_company}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={dic.placeholder_company}
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          )}

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>{dic.label_message}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={dic.placeholder_message}
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="copy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{dic.label_copy}</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {dic.name_submit_button}
          </Button>
        </form>
      </Form>
    </div>
  );
}
