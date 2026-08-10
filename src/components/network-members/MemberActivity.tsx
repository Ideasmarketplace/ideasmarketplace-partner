"use client";

import { Clock3 } from "lucide-react";

const activities = [
  {
    id: 1,
    text: "Uploaded a new asset",
    time: "5 mins ago",
  },
  {
    id: 2,
    text: "Generated a revenue report",
    time: "Yesterday",
  },
  {
    id: 3,
    text: "Invited a new network member",
    time: "3 days ago",
  },
];

export default function MemberActivity() {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <h3 className="font-semibold">Recent Activity</h3>

      <div className="mt-5 space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <Clock3 className="h-4 w-4 text-muted-foreground" />
            </div>

            <div>
              <p className="text-sm">{activity.text}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
