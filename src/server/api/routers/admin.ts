import { z } from "zod";
import { createTRPCRouter, adminProcedure } from "@/server/api/trpc";
import { eventSchema } from "@/lib/validations";
import { 
  getStatsUseCase, 
  getMembersUseCase, 
  deleteMemberProfileUseCase, 
  deleteUserUseCase, 
  createEventUseCase, 
  updateEventUseCase, 
  deleteEventUseCase 
} from "@/server/use-cases/admin";

export const adminRouter = createTRPCRouter({
  getStats: adminProcedure.query(async () => {
    return await getStatsUseCase();
  }),

  getMembers: adminProcedure.query(async () => {
    return await getMembersUseCase();
  }),

  deleteMemberProfile: adminProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input }) => {
      return await deleteMemberProfileUseCase(input.userId);
    }),

  deleteUser: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await deleteUserUseCase(input.id);
    }),

  createEvent: adminProcedure
    .input(eventSchema)
    .mutation(async ({ input }) => {
      return await createEventUseCase(input);
    }),

  updateEvent: adminProcedure
    .input(z.object({
      id: z.string(),
      data: eventSchema,
    }))
    .mutation(async ({ input }) => {
      return await updateEventUseCase(input.id, input.data);
    }),

  deleteEvent: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await deleteEventUseCase(input.id);
    }),
});
