import { Report } from "./types";

const authors = [
  "John Doe",
  "Sarah Wilson",
  "David Smith",
  "Grace Adams",
  "Michael Brown",
];

const categories = [
  "Finance",
  "Marketing",
  "Operations",
  "Sales",
  "Community",
];

const statuses: Report["status"][] = [
  "Published",
  "Draft",
  "Scheduled",
];

const reportCovers = [
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80", // Financial documents
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80", // Business meeting
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", // Analytics dashboard
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", // Charts & graphs
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80", // Laptop with report
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=800&q=80", // Team presentation
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80", // Business planning
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", // Conference room
];

const generatedReports: Report[] = Array.from(
  { length: 28 },
  (_, index): Report => ({
    id: `RPT-${String(index + 3).padStart(3, "0")}`,

    title: `Quarterly Report ${index + 3}`,

    description:
      "Comprehensive report containing insights, analytics and business performance.",

    status: statuses[index % statuses.length],

    author: authors[index % authors.length],

    category: categories[index % categories.length],

    createdAt: "Jul 12, 2026",

    updatedAt: "Jul 20, 2026",

    thumbnail: reportCovers[index % reportCovers.length],

    views: 320 + index * 18,

    downloads: 70 + index * 7,
  })
);

export const mockReports: Report[] = [
  {
    id: "RPT-001",

    title: "Annual Financial Report",

    description:
      "A complete overview of financial performance for the fiscal year.",

    status: "Published",

    author: "John Doe",

    category: "Finance",

    createdAt: "Jul 15, 2026",

    updatedAt: "Jul 22, 2026",

    thumbnail:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",

    views: 2450,

    downloads: 612,
  },

  {
    id: "RPT-002",

    title: "Marketing Performance",

    description:
      "Campaign performance, audience engagement and ROI analysis.",

    status: "Draft",

    author: "Sarah Wilson",

    category: "Marketing",

    createdAt: "Jul 10, 2026",

    updatedAt: "Jul 18, 2026",

    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",

    views: 980,

    downloads: 184,
  },

  ...generatedReports,
];