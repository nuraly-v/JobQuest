
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { StatusCount } from '@/types';

interface StatusDonutProps {
  data: StatusCount[];
}

const StatusDonut: React.FC<StatusDonutProps> = ({ data }) => {
  // Filter out statuses with count 0
  const filteredData = data.filter(item => item.count > 0);
  
  const COLORS = {
    applied: '#3B82F6',    // Blue
    interview: '#8B5CF6',  // Purple
    offer: '#10B981',      // Green
    rejected: '#F43F5E',   // Red
    pending: '#F59E0B',    // Amber
  };
  
  const LABELS = {
    applied: 'Applied',
    interview: 'Interview',
    offer: 'Offer',
    rejected: 'Rejected',
    pending: 'Pending',
  };

  // Format the data for better display in the tooltip
  const formattedData = filteredData.map(item => ({
    ...item,
    name: LABELS[item.status],
  }));

  // Calculate total for percentage
  const total = filteredData.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="pb-2">
        <CardTitle>Application Status Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={formattedData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="count"
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = outerRadius + 10;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  
                  // Only show label if percentage is significant enough
                  if (percent < 0.05) return null;
                  
                  return (
                    <text
                      x={x}
                      y={y}
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                      fill="#888888"
                      fontSize={12}
                    >
                      {name} ({`${(percent * 100).toFixed(0)}%`})
                    </text>
                  );
                }}
              >
                {formattedData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[entry.status]} 
                    stroke="hsl(var(--background))" 
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [
                  `${value} (${((value as number / total) * 100).toFixed(1)}%)`,
                  name
                ]}
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusDonut;
