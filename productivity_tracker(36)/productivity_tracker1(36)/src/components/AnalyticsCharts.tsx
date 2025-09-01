import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Clock, Target, BarChart3, PieChart as PieChartIcon, Calendar } from "lucide-react";
import { useState } from "react";

export const AnalyticsCharts = () => {
  const [timeRange, setTimeRange] = useState("week");

  // Sample data for charts
  const weeklyData = [
    { day: 'Mon', hours: 7.5, tasks: 5, productivity: 85 },
    { day: 'Tue', hours: 6.2, tasks: 4, productivity: 78 },
    { day: 'Wed', hours: 8.1, tasks: 6, productivity: 92 },
    { day: 'Thu', hours: 5.8, tasks: 3, productivity: 72 },
    { day: 'Fri', hours: 7.9, tasks: 5, productivity: 88 },
    { day: 'Sat', hours: 3.2, tasks: 2, productivity: 65 },
    { day: 'Sun', hours: 2.1, tasks: 1, productivity: 55 }
  ];

  const monthlyData = [
    { week: 'Week 1', hours: 35.2, tasks: 18, productivity: 82 },
    { week: 'Week 2', hours: 38.7, tasks: 22, productivity: 87 },
    { week: 'Week 3', hours: 32.1, tasks: 16, productivity: 79 },
    { week: 'Week 4', hours: 40.3, tasks: 25, productivity: 91 }
  ];

  const categoryData = [
    { name: 'Development', value: 45, color: '#3b82f6' },
    { name: 'Design', value: 25, color: '#10b981' },
    { name: 'Meetings', value: 15, color: '#f59e0b' },
    { name: 'Documentation', value: 10, color: '#ef4444' },
    { name: 'Research', value: 5, color: '#8b5cf6' }
  ];

  const productivityTrend = [
    { date: '1/1', score: 75 },
    { date: '1/2', score: 82 },
    { date: '1/3', score: 78 },
    { date: '1/4', score: 85 },
    { date: '1/5', score: 91 },
    { date: '1/6', score: 88 },
    { date: '1/7', score: 94 },
    { date: '1/8', score: 87 },
    { date: '1/9', score: 92 },
    { date: '1/10', score: 89 }
  ];

  const currentData = timeRange === "week" ? weeklyData : monthlyData;
  const xAxisKey = timeRange === "week" ? "day" : "week";

  const totalHours = currentData.reduce((sum, item) => sum + item.hours, 0);
  const totalTasks = currentData.reduce((sum, item) => sum + item.tasks, 0);
  const avgProductivity = Math.round(currentData.reduce((sum, item) => sum + item.productivity, 0) / currentData.length);

  return (
    <div className="space-y-6">
      {/* Header with time range selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Track your productivity trends and insights</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours.toFixed(1)}h</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <p className="text-xs text-success">+12% from last {timeRange}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <p className="text-xs text-success">+8% from last {timeRange}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Productivity</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgProductivity}%</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-success" />
              <p className="text-xs text-success">+5% from last {timeRange}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hours Worked Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Hours Worked
            </CardTitle>
            <CardDescription>
              Daily/weekly hours breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xAxisKey} />
                <YAxis />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tasks Completed Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Tasks Completed
            </CardTitle>
            <CardDescription>
              Task completion trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xAxisKey} />
                <YAxis />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="tasks" 
                  stroke="hsl(var(--accent))" 
                  fill="hsl(var(--accent))" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5" />
              Time by Category
            </CardTitle>
            <CardDescription>
              How you spend your time across different categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {categoryData.map((category) => (
                  <div key={category.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm">{category.name}</span>
                    <Badge variant="outline">{category.value}%</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Productivity Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Productivity Trend
            </CardTitle>
            <CardDescription>
              Your productivity score over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={productivityTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights and Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Insights & Recommendations
          </CardTitle>
          <CardDescription>
            AI-powered insights based on your productivity patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="font-medium text-success">Great Progress!</span>
              </div>
              <p className="text-sm">
                You've increased your productivity by 12% compared to last week. Keep up the excellent work!
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-warning" />
                <span className="font-medium text-warning">Peak Performance</span>
              </div>
              <p className="text-sm">
                Your most productive hours are between 9 AM - 11 AM. Consider scheduling important tasks during this time.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="font-medium text-primary">Goal Achievement</span>
              </div>
              <p className="text-sm">
                You're 85% towards your weekly goal of 40 hours. Just 6 more hours to reach your target!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};