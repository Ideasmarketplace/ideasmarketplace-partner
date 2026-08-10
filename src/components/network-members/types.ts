export type MemberStatus =
  | "Active"
  | "Pending"
  | "Suspended";

export type MemberRole =
  | "Owner"
  | "Admin"
  | "Manager"
  | "Editor"
  | "Viewer";

export interface NetworkMember {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  joinedAt: string;
  lastActive: string;
  assetsManaged: number;
  revenueGenerated: number;
  phone?: string;
  location?: string;
  notes?: string;
}