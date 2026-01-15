import { TRPCError } from "@trpc/server";
import { 
  getAllEvents, 
  getEventById, 
  registerUserForEvent, 
  checkEventRegistration 
} from "@/server/data-access/event";

export async function getAllEventsUseCase() {
  return await getAllEvents();
}

export async function registerForEventUseCase(userId: string, eventId: string) {
  const event = await getEventById(eventId);
  if (!event) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Event not found",
    });
  }

  const alreadyRegistered = await checkEventRegistration(userId, eventId);
  if (alreadyRegistered) {
    throw new TRPCError({
      code: "CONFLICT",
      message: "You are already registered for this event",
    });
  }

  return await registerUserForEvent(userId, eventId);
}
