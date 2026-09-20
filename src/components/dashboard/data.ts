import { BriefcaseBusiness, LayoutDashboard, Users } from "lucide-react";

export const candidates = [
  { name: "Maya Chen", initials: "MC", role: "Senior Product Designer", score: 94, stage: "Screened", location: "New York, NY", applied: "2h ago", color: "#d8e8f5" },
  { name: "Jordan Bell", initials: "JB", role: "Senior Product Designer", score: 91, stage: "Interview", location: "Austin, TX", applied: "5h ago", color: "#e5e1fb" },
  { name: "Priya Nair", initials: "PN", role: "Senior Product Designer", score: 88, stage: "Screened", location: "Remote", applied: "Yesterday", color: "#f3dfd3" },
  { name: "Noah Williams", initials: "NW", role: "Senior Product Designer", score: 84, stage: "Applied", location: "Chicago, IL", applied: "Yesterday", color: "#e1eee2" },
  { name: "Elena Rossi", initials: "ER", role: "Senior Product Designer", score: 81, stage: "Applied", location: "Remote", applied: "2d ago", color: "#f1e5cc" },
  { name: "Sam Okafor", initials: "SO", role: "Senior Product Designer", score: 78, stage: "Rejected", location: "Boston, MA", applied: "3d ago", color: "#e5e4e0" },
] as const;

export const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Candidates", icon: Users, count: "42" },
  { label: "Jobs", icon: BriefcaseBusiness, count: "5" },
];

export type Candidate = (typeof candidates)[number];
