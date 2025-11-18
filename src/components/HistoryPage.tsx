import { AshokaChakra } from "./AshokaChakra";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Clock, Trash2, Globe, Calendar } from "lucide-react";
import { useState } from "react";

interface HistoryItem {
  id: string;
  title: string;
  url: string;
  timestamp: Date;
  favicon?: string;
}

export function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: "1", title: "Google Search", url: "https://google.com", timestamp: new Date(Date.now() - 1000 * 60 * 5), favicon: "🔍" },
    { id: "2", title: "GitHub", url: "https://github.com", timestamp: new Date(Date.now() - 1000 * 60 * 15), favicon: "💻" },
    { id: "3", title: "Stack Overflow", url: "https://stackoverflow.com", timestamp: new Date(Date.now() - 1000 * 60 * 30), favicon: "📚" },
    { id: "4", title: "YouTube", url: "https://youtube.com", timestamp: new Date(Date.now() - 1000 * 60 * 60), favicon: "📺" },
    { id: "5", title: "Khan Academy", url: "https://khanacademy.org", timestamp: new Date(Date.now() - 1000 * 60 * 120), favicon: "🎓" },
  ]);

  const groupByDate = (items: HistoryItem[]) => {
    const groups: { [key: string]: HistoryItem[] } = {};
    
    items.forEach(item => {
      const date = item.timestamp.toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
    });
    
    return groups;
  };

  const groupedHistory = groupByDate(history);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getRelativeDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    return dateString;
  };

  return (
    <div className="h-full w-full overflow-auto">
      <div className="min-h-full relative bg-gradient-to-br from-cyan-50 via-white to-blue-50">
        {/* Decorative Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle, #00CED1 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
        
        {/* Decorative Ashoka Chakra */}
        <div className="absolute top-10 right-10 w-64 h-64 opacity-10">
          <AshokaChakra size={256} className="text-cyan-700 animate-spin" style={{ animationDuration: '60s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="flex items-center justify-center gap-3">
              <Clock className="h-12 w-12 text-cyan-700" />
              <h1 className="text-4xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Browsing History
              </h1>
            </div>
            <p className="text-muted-foreground italic">
              इतिहास - Your Journey Through the Web
            </p>
          </div>

          {/* Search and Clear */}
          <div className="flex gap-4">
            <Card className="p-4 bg-white/80 backdrop-blur-sm flex-1">
              <Input
                placeholder="Search history..."
                className="w-full"
              />
            </Card>
            <Button variant="destructive" className="whitespace-nowrap">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All History
            </Button>
          </div>

          {/* History Items Grouped by Date */}
          <div className="space-y-6">
            {Object.entries(groupedHistory).map(([date, items]) => (
              <Card key={date} className="p-6 bg-white/80 backdrop-blur-sm border-2 border-cyan-200/50">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-cyan-600" />
                  <h3>{getRelativeDate(date)}</h3>
                </div>
                
                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-cyan-50 hover:bg-cyan-100 transition-colors group cursor-pointer"
                    >
                      <div className="text-sm text-muted-foreground w-16 flex-shrink-0">
                        {formatTime(item.timestamp)}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-lg">
                        {item.favicon || <Globe className="h-4 w-4 text-cyan-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{item.title}</div>
                        <div className="text-xs text-muted-foreground truncate">{item.url}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 bg-gradient-to-br from-cyan-50 to-white border-cyan-200/50">
              <div className="text-center">
                <div className="text-2xl mb-1">{history.length}</div>
                <div className="text-sm text-muted-foreground">Total Visits</div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-white border-blue-200/50">
              <div className="text-center">
                <div className="text-2xl mb-1">
                  {Object.keys(groupedHistory).length}
                </div>
                <div className="text-sm text-muted-foreground">Days Active</div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-indigo-50 to-white border-indigo-200/50">
              <div className="text-center">
                <div className="text-2xl mb-1">
                  {new Set(history.map(h => new URL(h.url).hostname)).size}
                </div>
                <div className="text-sm text-muted-foreground">Unique Sites</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
