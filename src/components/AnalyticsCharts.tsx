import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

interface AnalyticsChartProps {
  data: {
    name: string;
    [key: string]: string | number;
  }[];
  title: string;
  dataKeys: {
    key: string;
    name: string;
    color: string;
  }[];
}

export function AnalyticsChart({ data, title, dataKeys }: AnalyticsChartProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false}
              width={40}
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Legend />
            {dataKeys.map((dataKey) => (
              <Area
                key={dataKey.key}
                type="monotone"
                dataKey={dataKey.key}
                name={dataKey.name}
                stroke={dataKey.color}
                fill={dataKey.color}
                fillOpacity={0.2}
                activeDot={{ r: 8 }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}