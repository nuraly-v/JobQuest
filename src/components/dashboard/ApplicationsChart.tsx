
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from "recharts";
import { Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { MonthlyApplications } from '@/types';

interface ApplicationsChartProps {
  data: MonthlyApplications[];
}

const ApplicationsChart: React.FC<ApplicationsChartProps> = ({ data }) => {
  return (
    <Card className="w-full shadow-md">
      <CardHeader className="pb-2">
        <CardTitle>Applications Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Bar
                dataKey="count"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
                name="Applications"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationsChart;
