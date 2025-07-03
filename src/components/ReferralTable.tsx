import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Badge } from "@/components/ui/badge";
  
  export interface ReferralUser {
    id: string;
    name: string;
    email: string;
    date: string;
    purchases: number;
    spent: number;
    status: "active" | "inactive";
  }
  
  interface ReferralTableProps {
    users: ReferralUser[];
  }
  
  export function ReferralTable({ users }: ReferralTableProps) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Purchases</TableHead>
              <TableHead className="text-right">Total Spent</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.date}</TableCell>
                <TableCell className="text-right">{user.purchases}</TableCell>
                <TableCell className="text-right">${user.spent.toLocaleString()}</TableCell>
                <TableCell className="text-center">
                  <Badge 
                    variant={user.status === "active" ? "default" : "outline"}
                    className={
                      user.status === "active" 
                        ? "bg-analytics-green hover:bg-analytics-green/80" 
                        : "text-muted-foreground"
                    }
                  >
                    {user.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
  