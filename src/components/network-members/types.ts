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
  photo: string;
  firstName: string;
  lastName: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  createdAt: string;
  totalAssets: number;
  totalRevenue: number;
  phone?: string;
  location?: string;
  notes?: string;
}