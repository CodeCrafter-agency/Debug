import { useState, useEffect } from "react";
import { AshokaChakra } from "./AshokaChakra";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import { Checkbox } from "./ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  BookOpen,
  Clock,
  CheckSquare,
  Calculator,
  Target,
  Trophy,
  Brain,
  Flame,
  Plus,
  Play,
  Pause,
  RotateCw,
  Trash2,
  Edit,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface StudySession {
  date: string;
  duration: number;
}

const MOTIVATIONAL_QUOTES = [
  "विद्या ददाति विनयं - Knowledge gives humility",
  "सा विद्या या विमुक्तये - That is knowledge which liberates",
  "योगः कर्मसु कौशलम् - Excellence in action is Yoga",
  "विद्या धनं सर्व धनं प्रधानम् - Knowledge is the supreme wealth",
];

export function StudyModePage() {
  // Pomodoro Timer
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState<"focus" | "break">("focus");
  
  // Tasks
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Complete Mathematics Assignment", completed: false },
    { id: "2", text: "Read Physics Chapter 5", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  
  // Notes
  const [notes, setNotes] = useState("");
  
  // Study Stats
  const [todayStudyTime, setTodayStudyTime] = useState(120); // minutes
  const [weeklyGoal] = useState(1400); // 1400 minutes per week
  const [streak, setStreak] = useState(7);
  const [currentQuote, setCurrentQuote] = useState(MOTIVATIONAL_QUOTES[0]);

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Switch session type
      if (sessionType === "focus") {
        setSessionType("break");
        setTimeLeft(5 * 60); // 5 minute break
      } else {
        setSessionType("focus");
        setTimeLeft(25 * 60); // 25 minute focus
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, sessionType]);

  // Random quote on mount
  useEffect(() => {
    const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    setCurrentQuote(randomQuote);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedTasks = tasks.filter(t => t.completed).length;
  const progressPercentage = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  return (
    <div className="h-full w-full overflow-auto">
      {/* Indian Heritage Pattern Background */}
      <div className="min-h-full relative bg-gradient-to-br from-orange-50 via-white to-green-50">
        {/* Decorative Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle, #FF9933 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
        
        {/* Mandala-style decorative elements */}
        <div className="absolute top-10 right-10 w-64 h-64 opacity-10">
          <AshokaChakra size={256} className="text-blue-700 animate-spin" style={{ animationDuration: '60s' }} />
        </div>
        <div className="absolute bottom-10 left-10 w-48 h-48 opacity-10">
          <AshokaChakra size={192} className="text-green-700 animate-spin" style={{ animationDuration: '80s', animationDirection: 'reverse' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="flex items-center justify-center gap-3">
              <AshokaChakra size={48} className="text-blue-700" />
              <h1 className="text-4xl bg-gradient-to-r from-orange-600 via-blue-700 to-green-700 bg-clip-text text-transparent">
                Study Mode
              </h1>
            </div>
            <p className="text-muted-foreground italic">
              {currentQuote}
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-white border-orange-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Focus</p>
                  <h3 className="text-2xl mt-1">{todayStudyTime} min</h3>
                </div>
                <Clock className="h-10 w-10 text-orange-600" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tasks Done</p>
                  <h3 className="text-2xl mt-1">{completedTasks}/{tasks.length}</h3>
                </div>
                <CheckSquare className="h-10 w-10 text-blue-600" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Study Streak</p>
                  <h3 className="text-2xl mt-1">{streak} days</h3>
                </div>
                <Flame className="h-10 w-10 text-green-600" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-white border-yellow-200/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Weekly Goal</p>
                  <h3 className="text-2xl mt-1">{Math.round((todayStudyTime * 7 / weeklyGoal) * 100)}%</h3>
                </div>
                <Target className="h-10 w-10 text-yellow-600" />
              </div>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Timer and Quick Tools */}
            <div className="space-y-6">
              {/* Pomodoro Timer */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-orange-200/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-orange-600" />
                    Pomodoro Timer
                  </h3>
                  <Badge variant={sessionType === "focus" ? "default" : "secondary"}>
                    {sessionType === "focus" ? "Focus" : "Break"}
                  </Badge>
                </div>

                {/* Timer Display */}
                <div className="relative mb-6">
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <svg className="transform -rotate-90 w-48 h-48">
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-orange-100"
                        />
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 88}`}
                          strokeDashoffset={`${2 * Math.PI * 88 * (1 - timeLeft / (sessionType === "focus" ? 25 * 60 : 5 * 60))}`}
                          className="text-orange-600 transition-all duration-1000"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl">{formatTime(timeLeft)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timer Controls */}
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={() => setIsRunning(!isRunning)}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  >
                    {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                    {isRunning ? "Pause" : "Start"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setTimeLeft(sessionType === "focus" ? 25 * 60 : 5 * 60);
                      setIsRunning(false);
                    }}
                  >
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>
              </Card>

              {/* Quick Calculator */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-blue-200/50">
                <h3 className="flex items-center gap-2 mb-4">
                  <Calculator className="h-5 w-5 text-blue-600" />
                  Quick Calculator
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
                    <Button
                      key={btn}
                      variant="outline"
                      className="h-12 hover:bg-blue-50"
                    >
                      {btn}
                    </Button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Middle Column - Tasks */}
            <div className="space-y-6">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-green-200/50">
                <h3 className="flex items-center gap-2 mb-4">
                  <CheckSquare className="h-5 w-5 text-green-600" />
                  Today's Tasks
                </h3>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>

                <Separator className="my-4" />

                {/* Add Task */}
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Add new task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
                    className="flex-1"
                  />
                  <Button onClick={handleAddTask} size="icon" className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Task List */}
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-2 p-3 rounded-lg bg-green-50/50 hover:bg-green-50 transition-colors group"
                    >
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="flex-shrink-0"
                      />
                      <span className={`flex-1 ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                        {task.text}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100"
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Achievement Badge */}
              <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200/50">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4>Great Progress!</h4>
                    <p className="text-sm text-muted-foreground">
                      You're on a {streak} day streak. Keep it up!
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Notes and Resources */}
            <div className="space-y-6">
              {/* Notes */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-purple-200/50">
                <h3 className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  Quick Notes
                </h3>
                <Textarea
                  placeholder="Take notes during your study session..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[200px] resize-none"
                />
                <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                  Save Notes
                </Button>
              </Card>

              {/* Study Resources */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-indigo-200/50">
                <h3 className="mb-4">Study Resources</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start hover:bg-indigo-50">
                    📚 NCERT Solutions
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-indigo-50">
                    🎓 Khan Academy
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-indigo-50">
                    📝 Study Material
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-indigo-50">
                    🧮 Practice Problems
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-indigo-50">
                    📖 E-Library
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
