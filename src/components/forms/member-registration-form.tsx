"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  memberSchema,
  type MemberFormValues,
  ageGroups,
  educationLevels,
  employmentStatuses,
} from "@/lib/validations";
import { api } from "@/trpc/react";

export interface MemberFormProps {
  initialData?: MemberFormValues;
  mode?: "register" | "update";
  onSuccess?: () => void;
}

export function MemberRegistrationForm({ initialData, mode = "register", onSuccess }: MemberFormProps) {
  const router = useRouter();
  const utils = api.useUtils();
  
  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: initialData ?? {
      fullName: "",
      address: "",
      phoneNumber: "",
      ageGroup: "",
      educationLevel: "",
      employmentStatus: "",
      employmentTitle: "",
    },
  });

  const { mutate: register, isPending: isRegistering } = api.member.register.useMutation({
    onSuccess: () => {
      toast.success("Successfully registered as a member!");
      router.refresh();
      if (onSuccess) onSuccess();
      else router.push("/profile");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to register. Please try again.");
    },
  });

  const { mutate: update, isPending: isUpdating } = api.member.update.useMutation({
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      router.refresh();
      void utils.member.getProfile.invalidate();
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile. Please try again.");
    },
  });

  const isPending = isRegistering || isUpdating;

  function onSubmit(values: MemberFormValues) {
    if (mode === "update") {
      update(values);
    } else {
      register(values);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Abdullahi Ali" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St, City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Info (Phone Number)</FormLabel>
              <FormControl>
                <Input placeholder="+252..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="ageGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age Group</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age group" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ageGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group} years
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="educationLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Education Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {educationLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="employmentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {employmentStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="employmentTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Title (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (initialData ? "Updating..." : "Registering...") : (initialData ? "Save Changes" : "Complete Registration")}
        </Button>
      </form>
    </Form>
  );
}
