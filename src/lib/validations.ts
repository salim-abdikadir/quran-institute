import { z } from "zod";

export const memberSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  address: z.string().min(5, "Address is required"),
  phoneNumber: z.string().min(10, "Phone number is required"),
  ageGroup: z.string().nonempty("Age group is required"),
  educationLevel: z.string().nonempty("Education level is required"),
  employmentStatus: z.string().nonempty("Employment status is required"),
  employmentTitle: z.string().optional(),
});

export type MemberFormValues = z.infer<typeof memberSchema>;

export const ageGroups = [
  "15-19",
  "20-24",
  "25-29",
  "30-34",
  "35-39",
  "40-44",
  "45-49",
  "50-54",
  "55-59",
  "60+",
];

export const educationLevels = [
  "None",
  "Primary",
  "Secondary",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
];

export const employmentStatuses = [
  "Student",
  "Employed",
  "Self-employed",
  "Unemployed",
  "Retired",
];

export const eventSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description is required"),
  date: z.date(),
  location: z.string().min(2, "Location is required"),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

export type EventFormValues = z.infer<typeof eventSchema>;
