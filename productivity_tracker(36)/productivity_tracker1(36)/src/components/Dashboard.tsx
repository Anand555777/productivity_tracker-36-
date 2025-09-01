import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TaskManager } from "./TaskManager";
import { TimeTracker } from "./TimeTracker";
import { AnalyticsCharts } from "./AnalyticsCharts";
import { 
  Clock, 
  CheckCircle2, 
  Target, 
  TrendingUp, 
  Play, 
  Pause,
  Plus,
  Calendar,
  BarChart3
} from "lucide-react";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isTracking, setIsTracking] = useState(false);
  const [currentTask, setCurrentTask] = useState("Working on landing page design");

  const stats = {
    tasksCompleted: 8,
    totalTasks: 12,
    hoursToday: 6.5,
    weeklyGoal: 40,
    productivity: 85
  };

  const recentTasks = [
    { id: 1, title: "Complete dashboard design", status: "completed", priority: "high", time: "2h 30m" },
    { id: 2, title: "Review code changes", status: "in-progress", priority: "medium", time: "45m" },
    { id: 3, title: "Team standup meeting", status: "completed", priority: "low", time: "30m" },
    { id: 4, title: "Update project documentation", status: "pending", priority: "medium", time: "0m" }
  ];

  const handleTrackingToggle = () => {
    setIsTracking(!isTracking);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Productivity Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Track your tasks, manage time, and boost productivity
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Today
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Task
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-border">
          {[
            { id: "overview", label: "Overview" },
            { id: "tasks", label: "Tasks" },
            { id: "time", label: "Time Tracking" },
            { id: "analytics", label: "Analytics" }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id)}
              className="mb-4"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Current Time Tracker */}
        <Card className="bg-gradient-to-r from-card to-secondary/20 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Currently working on</span>
                </div>
                <h3 className="text-xl font-semibold">{currentTask}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {isTracking ? "Time: 1h 23m" : "Not tracking"}
                </p>
              </div>
              
              <Button 
                onClick={handleTrackingToggle}
                size="lg"
                className={`gap-2 ${isTracking ? 'bg-destructive hover:bg-destructive/90' : ''}`}
              >
                {isTracking ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Start
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content based on active tab */}
        {activeTab === "overview" && (
          <div className="grid gap-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.tasksCompleted}/{stats.totalTasks}</div>
                  <Progress value={(stats.tasksCompleted / stats.totalTasks) * 100} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hours Today</CardTitle>
                  <Clock className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.hoursToday}h</div>
                  <p className="text-xs text-muted-foreground">
                    Goal: 8h
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
                  <Target className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">32/{stats.weeklyGoal}h</div>
                  <Progress value={80} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Productivity</CardTitle>
                  <TrendingUp className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.productivity}%</div>
                  <p className="text-xs text-success">
                    +12% from last week
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Tasks</CardTitle>
                <CardDescription>Your latest activities and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          task.status === 'completed' ? 'bg-success' : 
                          task.status === 'in-progress' ? 'bg-primary' : 'bg-muted'
                        }`} />
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-muted-foreground">Time spent: {task.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          task.priority === 'high' ? 'destructive' : 
                          task.priority === 'medium' ? 'default' : 'secondary'
                        }>
                          {task.priority}
                        </Badge>
                        <Badge variant="outline">
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "tasks" && <TaskManager />}
        {activeTab === "time" && <TimeTracker />}
        {activeTab === "analytics" && <AnalyticsCharts />}
      </div>
    </div>
  );
};