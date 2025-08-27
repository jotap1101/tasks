import { ReactNode } from "react";

export function getInitials(name: string): ReactNode {
  if (!name) return null;
  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
  return initials;
}
