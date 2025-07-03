import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from "recharts";

interface EarningSource {
  name: string;
  value: number;
  color: string;
}

interface EarningsBreakdownProps {
  data: EarningSource[];
  total: number;
}

export function EarningsBreakdown({ data, total }: EarningsBreakdownProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Total Earnings</p>
            <p className="text-3xl font-bold">${total.toLocaleString()}</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({name, percent}:any) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}