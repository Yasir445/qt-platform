import { Role } from "@prisma/client";

const ROLE_RANK: Record<Role, number> = {
  USER: 0,
  PREMIUM: 1,
  MODERATOR: 2,
  ADMIN: 3,
};

/**
 * True if `role` meets or exceeds `required`. Always call this server-side —
 * a client-sent role claim is never trustworthy on its own.
 */
export function hasRole(role: Role | undefined, required: Role): boolean {
  if (!role) return false;
  return ROLE_RANK[role] >= ROLE_RANK[required];
}

export class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
  }
}

/** Throws ForbiddenError if the session role doesn't meet the requirement. Call at the top of every mutating route handler. */
export function requireRole(role: Role | undefined, required: Role) {
  if (!hasRole(role, required)) {
    throw new ForbiddenError(`Requires ${required} role or higher`);
  }
}
