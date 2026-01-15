import { z } from "zod";

export const memberProfileDto = z.object({
  id: z.string(),
  fullName: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
  ageGroup: z.string(),
  educationLevel: z.string(),
  employmentStatus: z.string(),
  employmentTitle: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type MemberProfileDto = z.infer<typeof memberProfileDto>;

export const eventDto = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.date(),
  location: z.string(),
  imageUrl: z.string().nullable(),
});

export type EventDto = z.infer<typeof eventDto>;

export function toMemberProfileDto(profile: unknown): MemberProfileDto {
  return memberProfileDto.parse(profile);
}

export function toEventDto(event: unknown): EventDto {
  return eventDto.parse(event);
}
