import { TRPCError } from "@trpc/server";
import type { Role } from "../../generated/prisma";

export type SessionUser = {
  id: string;
  role: Role;
};

export const Policy = {
  isAdmin: (user: SessionUser) => {
    if (user.role !== "ADMIN") {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
    }
  },
  
  isOwner: (user: SessionUser, resourceUserId: string) => {
    if (user.id !== resourceUserId && user.role !== "ADMIN") {
      throw new TRPCError({ code: "FORBIDDEN", message: "You do not own this resource" });
    }
  },

  isLoggedIn: (user?: SessionUser | null) => {
    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
    }
  }
};
