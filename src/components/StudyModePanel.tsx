import { Calculator, Clock, Calendar, BookOpen, StickyNote, X } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

interface StudyModePanelProps {
  onClose: () => void;
}

export function StudyModePanel({ onClose }: StudyModePanelProps) {
  const [notes, setNotes] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Update time every second
  useState(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className="w-80 h-full bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h3>Study Mode</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Clock Widget */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Current Time</span>
          </div>
          <div className="text-2xl">{time}</div>
        </Card>

        {/* Calendar Widget */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Today</span>
          </div>
          <div>{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</div>
        </Card>

        {/* Quick Notes */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <StickyNote className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Quick Notes</span>
          </div>
          <Textarea
            placeholder="Take quick notes while studying..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[120px] resize-none"
          />
        </Card>

        {/* Calculator Link */}
        <Card className="p-4 cursor-pointer hover:bg-accent/50">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Open Calculator</span>
          </div>
        </Card>

        {/* Study Resources */}
        <div>
          <h4 className="text-sm mb-2">Quick Links</h4>
          <div className="space-y-2">
            <Card className="p-3 cursor-pointer hover:bg-accent/50">
              <span className="text-sm">📚 Online Library</span>
            </Card>
            <Card className="p-3 cursor-pointer hover:bg-accent/50">
              <span className="text-sm">📝 Note Taking App</span>
            </Card>
            <Card className="p-3 cursor-pointer hover:bg-accent/50">
              <span className="text-sm">🎓 Learning Resources</span>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
