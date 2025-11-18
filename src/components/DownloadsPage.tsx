import { AshokaChakra } from "./AshokaChakra";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Download, Folder, FileText, Image, Film, Music, Archive, Trash2, Pause, Play } from "lucide-react";
import { useState } from "react";
import { Progress } from "./ui/progress";

interface DownloadItem {
  id: string;
  name: string;
  url: string;
  size: string;
  progress: number;
  status: "downloading" | "completed" | "paused" | "failed";
  type: "document" | "image" | "video" | "audio" | "archive" | "other";
  timestamp: Date;
}

export function DownloadsPage() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([
    { 
      id: "1", 
      name: "NCERT_Mathematics_Class12.pdf", 
      url: "https://ncert.nic.in/textbook/pdf/kemh101.pdf",
      size: "15.2 MB",
      progress: 100,
      status: "completed",
      type: "document",
      timestamp: new Date(Date.now() - 1000 * 60 * 5)
    },
    { 
      id: "2", 
      name: "Python_Tutorial.mp4", 
      url: "https://example.com/video.mp4",
      size: "245 MB",
      progress: 65,
      status: "downloading",
      type: "video",
      timestamp: new Date()
    },
    { 
      id: "3", 
      name: "Study_Notes.zip", 
      url: "https://example.com/notes.zip",
      size: "8.5 MB",
      progress: 100,
      status: "completed",
      type: "archive",
      timestamp: new Date(Date.now() - 1000 * 60 * 60)
    },
  ]);

  const getIcon = (type: DownloadItem["type"]) => {
    switch (type) {
      case "document": return <FileText className="h-8 w-8 text-blue-600" />;
      case "image": return <Image className="h-8 w-8 text-green-600" />;
      case "video": return <Film className="h-8 w-8 text-purple-600" />;
      case "audio": return <Music className="h-8 w-8 text-pink-600" />;
      case "archive": return <Archive className="h-8 w-8 text-orange-600" />;
      default: return <FileText className="h-8 w-8 text-gray-600" />;
    }
  };

  return (
    <div className="h-full w-full overflow-auto">
      <div className="min-h-full relative bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle, #059669 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
        
        <div className="absolute top-10 right-10 w-64 h-64 opacity-10">
          <AshokaChakra size={256} className="text-emerald-700 animate-spin" style={{ animationDuration: '60s' }} />
        </div>

        <div className="relative z-10 p-8 max-w-6xl mx-auto space-y-6">
          <div className="text-center space-y-4 mb-8">
            <div className="flex items-center justify-center gap-3">
              <Download className="h-12 w-12 text-emerald-700" />
              <h1 className="text-4xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Downloads
              </h1>
            </div>
            <p className="text-muted-foreground italic">
              डाउनलोड - Your Downloaded Files
            </p>
          </div>

          {/* Active Downloads */}
          {downloads.some(d => d.status === "downloading") && (
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-emerald-200/50">
              <h3 className="mb-4">Active Downloads</h3>
              <div className="space-y-4">
                {downloads.filter(d => d.status === "downloading").map((download) => (
                  <div key={download.id} className="flex items-center gap-4 p-4 rounded-lg bg-emerald-50">
                    {getIcon(download.type)}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{download.name}</div>
                      <div className="text-sm text-muted-foreground">{download.size}</div>
                      <Progress value={download.progress} className="h-2 mt-2" />
                      <div className="text-xs text-muted-foreground mt-1">{download.progress}% complete</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Pause className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Completed Downloads */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-teal-200/50">
            <h3 className="mb-4">Recent Downloads</h3>
            <div className="space-y-3">
              {downloads.filter(d => d.status === "completed").map((download) => (
                <div key={download.id} className="flex items-center gap-4 p-4 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors group cursor-pointer">
                  {getIcon(download.type)}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{download.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {download.size} • {download.timestamp.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="outline" size="sm">
                      <Folder className="h-4 w-4 mr-2" />
                      Show in folder
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Download Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 bg-gradient-to-br from-emerald-50 to-white border-emerald-200/50">
              <div className="text-center">
                <div className="text-2xl mb-1">{downloads.length}</div>
                <div className="text-sm text-muted-foreground">Total Downloads</div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-teal-50 to-white border-teal-200/50">
              <div className="text-center">
                <div className="text-2xl mb-1">
                  {downloads.filter(d => d.status === "completed").length}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-cyan-50 to-white border-cyan-200/50">
              <div className="text-center">
                <div className="text-2xl mb-1">268 MB</div>
                <div className="text-sm text-muted-foreground">Total Size</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
