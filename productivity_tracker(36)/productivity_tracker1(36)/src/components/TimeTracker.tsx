import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, Square, Clock, Calendar, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TimeEntry {
  id: number;
  taskTitle: string;
  startTime: Date;
  endTime: Date | null;
  duration: number; // in minutes
  category: string;
  isRunning: boolean;
}

export const TimeTracker = () => {
  const { toast } = useToast();
  const [currentEntry, setCurrentEntry] = useState<TimeEntry | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedTask, setSelectedTask] = useState("");
  
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([
    {
      id: 1,
      taskTitle: "Homepage Design",
      startTime: new Date(2024, 0, 15, 9, 0),
      endTime: new Date(2024, 0, 15, 11, 30),
      duration: 150,
      category: "Design",
      isRunning: false
    },
    {
      id: 2,
      taskTitle: "API Development",
      startTime: new Date(2024, 0, 15, 14, 0),
      endTime: new Date(2024, 0, 15, 17, 45),
      duration: 225,
      category: "Development",
      isRunning: false
    },
    {
      id: 3,
      taskTitle: "Code Review",
      startTime: new Date(2024, 0, 16, 10, 30),
      endTime: new Date(2024, 0, 16, 11, 15),
      duration: 45,
      category: "Development",
      isRunning: false
    }
  ]);

  const availableTasks = [
    "Homepage Design",
    "API Development", 
    "Code Review",
    "User Testing",
    "Documentation",
    "Bug Fixes",
    "Feature Planning"
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (currentEntry?.isRunning) {
      interval = setInterval(() => {
        const now = new Date();
        const start = new Date(currentEntry.startTime);
        setElapsedTime(Math.floor((now.getTime() - start.getTime()) / 1000));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentEntry]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hrs > 0) {
      return `${hrs}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const handleStartTimer = () => {
    if (!selectedTask) {
      toast({
        title: "Select a task",
        description: "Please select a task before starting the timer",
        variant: "destructive"
      });
      return;
    }

    const newEntry: TimeEntry = {
      id: Date.now(),
      taskTitle: selectedTask,
      startTime: new Date(),
      endTime: null,
      duration: 0,
      category: "General",
      isRunning: true
    };

    setCurrentEntry(newEntry);
    setElapsedTime(0);
    
    toast({
      title: "Timer Started",
      description: `Started tracking time for "${selectedTask}"`
    });
  };

  const handlePauseTimer = () => {
    if (currentEntry) {
      const updatedEntry = {
        ...currentEntry,
        isRunning: false,
        endTime: new Date(),
        duration: Math.floor(elapsedTime / 60)
      };
      
      setTimeEntries([updatedEntry, ...timeEntries]);
      setCurrentEntry(null);
      setElapsedTime(0);
      
      toast({
        title: "Timer Paused",
        description: `Saved ${formatDuration(updatedEntry.duration)} for "${currentEntry.taskTitle}"`
      });
    }
  };

  const handleStopTimer = () => {
    if (currentEntry) {
      const finalEntry = {
        ...currentEntry,
        isRunning: false,
        endTime: new Date(),
        duration: Math.floor(elapsedTime / 60)
      };
      
      setTimeEntries([finalEntry, ...timeEntries]);
      setCurrentEntry(null);
      setElapsedTime(0);
      
      toast({
        title: "Timer Stopped",
        description: `Completed "${currentEntry.taskTitle}" in ${formatDuration(finalEntry.duration)}`,
        variant: "default"
      });
    }
  };

  const getTodaysTotalTime = () => {
    const today = new Date();
    const todaysEntries = timeEntries.filter(entry => {
      const entryDate = new Date(entry.startTime);
      return entryDate.toDateString() === today.toDateString();
    });
    
    return todaysEntries.reduce((total, entry) => total + entry.duration, 0);
  };

  const getThisWeeksTotalTime = () => {
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    
    const weekEntries = timeEntries.filter(entry => {
      const entryDate = new Date(entry.startTime);
      return entryDate >= weekStart;
    });
    
    return weekEntries.reduce((total, entry) => total + entry.duration, 0);
  };

  return (
    <div className="space-y-6">
      {/* Timer Control */}
      <Card className="bg-gradient-to-r from-card to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Time Tracker
          </CardTitle>
          <CardDescription>
            Track time spent on your tasks and projects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Select Task</label>
              <Select value={selectedTask} onValueChange={setSelectedTask}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a task to track" />
                </SelectTrigger>
                <SelectContent>
                  {availableTasks.map((task) => (
                    <SelectItem key={task} value={task}>
                      {task}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              {!currentEntry?.isRunning ? (
                <Button onClick={handleStartTimer} className="gap-2">
                  <Play className="h-4 w-4" />
                  Start
                </Button>
              ) : (
                <>
                  <Button onClick={handlePauseTimer} variant="secondary" className="gap-2">
                    <Pause className="h-4 w-4" />
                    Pause
                  </Button>
                  <Button onClick={handleStopTimer} variant="destructive" className="gap-2">
                    <Square className="h-4 w-4" />
                    Stop
                  </Button>
                </>
              )}
            </div>
          </div>

          {currentEntry?.isRunning && (
            <div className="text-center p-6 bg-secondary/50 rounded-lg">
              <div className="text-4xl font-mono font-bold text-primary mb-2">
                {formatTime(elapsedTime)}
              </div>
              <p className="text-sm text-muted-foreground">
                Working on: <span className="font-medium">{currentEntry.taskTitle}</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Time</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(getTodaysTotalTime())}</div>
            <p className="text-xs text-muted-foreground">
              Goal: 8h 0m
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(getThisWeeksTotalTime())}</div>
            <p className="text-xs text-success">
              +15% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {timeEntries.filter(e => new Date(e.startTime).toDateString() === new Date().toDateString()).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Work sessions completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Time Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Time Entries</CardTitle>
          <CardDescription>Your latest time tracking sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeEntries.slice(0, 10).map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium">{entry.taskTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {entry.startTime.toLocaleDateString()} • {entry.startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      {entry.endTime && ` - ${entry.endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {entry.category}
                  </Badge>
                  <div className="text-sm font-medium">
                    {formatDuration(entry.duration)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};