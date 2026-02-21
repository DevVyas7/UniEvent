'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { events, users } from "@/lib/placeholder-data";
import { TrendingUp, Users, CalendarDays, Award } from "lucide-react";

export default function DepartmentAnalyticsPage() {
  const [department, setDepartment] = useState("");

  useEffect(() => {
    const role = localStorage.getItem('userRole') || 'organizer';
    const user = users.find(u => u.role === role) || users.find(u => u.role === 'organizer');
    if (user) {
        setDepartment(user.department || "Academic");
    }
  }, []);

  const deptEvents = events.filter(e => e.department === department);
  
  // Mock data for charts
  const chartData = deptEvents.map(event => ({
    name: event.name.length > 15 ? event.name.substring(0, 15) + "..." : event.name,
    enrollment: Math.floor(Math.random() * 40) + 10,
  }));

  const chartConfig = {
    enrollment: {
      label: "Enrollment",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Department Analytics</h1>
        <p className="text-muted-foreground">Detailed insights into {department} department's student engagement.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Growth</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">+24%</div>
            <p className="text-xs text-muted-foreground mt-1">Enrollment vs last semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Avg Attendance</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">28.4</div>
            <p className="text-xs text-muted-foreground mt-1">Students per event</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Success Rate</CardTitle>
            <Award className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">92%</div>
            <p className="text-xs text-muted-foreground mt-1">Completion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground tracking-widest">Total Credit Hours</CardTitle>
            <CalendarDays className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">450.0</div>
            <p className="text-xs text-muted-foreground mt-1">Aggregated verified credits</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Enrollment by Event</CardTitle>
            <CardDescription>Visualizing student participation across active departmental activities.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ChartContainer config={chartConfig}>
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis 
                    dataKey="name" 
                    tickLine={false} 
                    tickMargin={10} 
                    axisLine={false} 
                    fontSize={12} 
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="enrollment" fill="var(--color-enrollment)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Engagement Summary</CardTitle>
            <CardDescription>Key findings for the current academic period.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
                <h4 className="font-bold text-sm">Top Performing Event</h4>
                <div className="p-4 bg-muted/30 rounded-xl border border-muted">
                    <p className="font-bold text-primary">Annual Hackathon 2024</p>
                    <p className="text-xs text-muted-foreground mt-1">42 active participants</p>
                </div>
            </div>
            <div className="space-y-2">
                <h4 className="font-bold text-sm">Key Insight</h4>
                <p className="text-sm text-muted-foreground italic leading-relaxed">
                  "Events offering Academic Credit have 3.5x higher enrollment rates compared to non-credit seminars within your department."
                </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
