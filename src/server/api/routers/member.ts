import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { memberSchema } from "@/lib/validations";
import { 
  getMyProfileUseCase, 
  registerMemberUseCase, 
  updateMemberProfileUseCase 
} from "@/server/use-cases/member";
import { toMemberProfileDto } from "@/lib/dto";

export const memberRouter = createTRPCRouter({
  register: protectedProcedure
    .input(memberSchema)
    .mutation(async ({ ctx, input }) => {
      const profile = await registerMemberUseCase(ctx.session.user, input);
      return toMemberProfileDto(profile);
    }),
  getProfile: protectedProcedure
    .query(async ({ ctx }) => {
      const profile = await getMyProfileUseCase(ctx.session.user);
      return profile ? toMemberProfileDto(profile) : null;
    }),
  update: protectedProcedure
    .input(memberSchema)
    .mutation(async ({ ctx, input }) => {
      const profile = await updateMemberProfileUseCase(ctx.session.user, input);
      return toMemberProfileDto(profile);
    }),
});
