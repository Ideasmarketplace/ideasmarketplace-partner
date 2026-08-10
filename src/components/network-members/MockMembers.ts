import { NetworkMember } from "./types";

const locations = [
  "New York, USA",
  "Toronto, Canada",
  "London, UK",
  "Berlin, Germany",
  "Sydney, Australia",
];

const roles: NetworkMember["role"][] = [
  "Owner",
  "Admin",
  "Manager",
  "Editor",
  "Viewer",
];

const statuses: NetworkMember["status"][] = ["Active", "Pending", "Suspended"];

const firstNames = [
  "John",
  "Sarah",
  "Michael",
  "Emily",
  "David",
  "Sophia",
  "Daniel",
  "Olivia",
  "James",
  "Emma",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Brown",
  "Wilson",
  "Taylor",
  "Anderson",
  "Thomas",
  "Jackson",
];

export const mockMembers: NetworkMember[] = Array.from(
  { length: 30 },
  (_, index) => {
    const firstName = firstNames[index % firstNames.length];
    const lastName = lastNames[index % lastNames.length];

    return {
      id: `MEM-${String(index + 1).padStart(3, "0")}`,
      avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      role: roles[index % roles.length],
      status: statuses[index % statuses.length],
      joinedAt: "Jul 12, 2026",
      lastActive:
        index % 3 === 0
          ? "5 mins ago"
          : index % 3 === 1
            ? "Yesterday"
            : "3 days ago",
      assetsManaged: Math.floor(Math.random() * 120),
      revenueGenerated: Math.floor(Math.random() * 95000) + 5000,
      phone: "+1 (555) 123-4567",
      location: locations[index % locations.length],
      notes: "Trusted network member responsible for digital asset management.",
    };
  },
);
