import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "@/server/api/trpc";
import { getAllEventsUseCase, registerForEventUseCase } from "@/server/use-cases/event";
import { toEventDto } from "@/lib/dto";

export const eventRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const events = await getAllEventsUseCase();
    return events.map(toEventDto);
  }),
  registerForEvent: protectedProcedure
    .input(z.object({ eventId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await registerForEventUseCase(ctx.session.user.id, input.eventId);
    }),
});
