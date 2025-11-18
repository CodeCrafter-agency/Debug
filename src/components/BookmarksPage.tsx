import { AshokaChakra } from "./AshokaChakra";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { BookMarked, Star, Trash2, Edit, Folder, Globe } from "lucide-react";
import { useState } from "react";

interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  folder?: string;
}

export function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
    { id: "1", title: "Google", url: "https://google.com", folder: "General", favicon: "🔍" },
    { id: "2", title: "GitHub", url: "https://github.com", folder: "Development", favicon: "💻" },
    { id: "3", title: "Stack Overflow", url: "https://stackoverflow.com", folder: "Development", favicon: "📚" },
    { id: "4", title: "YouTube", url: "https://youtube.com", folder: "Entertainment", favicon: "📺" },
    { id: "5", title: "Khan Academy", url: "https://khanacademy.org", folder: "Education", favicon: "🎓" },
    { id: "6", title: "NCERT", url: "https://ncert.nic.in", folder: "Education", favicon: "📖" },
  ]);

  const folders = Array.from(new Set(bookmarks.map(b => b.folder).filter(Boolean)));

  return (
    <div className="h-full w-full overflow-auto">
      <div className="min-h-full relative bg-gradient-to-br from-yellow-50 via-white to-amber-50">
        {/* Decorative Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle, #FFA500 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
        
        {/* Decorative Ashoka Chakra */}
        <div className="absolute top-10 right-10 w-64 h-64 opacity-10">
          <AshokaChakra size={256} className="text-yellow-700 animate-spin" style={{ animationDuration: '60s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="flex items-center justify-center gap-3">
              <BookMarked className="h-12 w-12 text-yellow-700" />
              <h1 className="text-4xl bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Bookmarks
              </h1>
            </div>
            <p className="text-muted-foreground italic">
              पसंदीदा पृष्ठ - Your Favorite Pages
            </p>
          </div>

          {/* Search Bar */}
          <Card className="p-4 bg-white/80 backdrop-blur-sm">
            <Input
              placeholder="Search bookmarks..."
              className="w-full"
            />
          </Card>

          {/* Bookmarks by Folder */}
          <div className="space-y-6">
            {folders.map((folder) => (
              <Card key={folder} className="p-6 bg-white/80 backdrop-blur-sm border-2 border-yellow-200/50">
                <div className="flex items-center gap-2 mb-4">
                  <Folder className="h-5 w-5 text-yellow-600" />
                  <h3>{folder}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {bookmarks
                    .filter(b => b.folder === folder)
                    .map((bookmark) => (
                      <div
                        key={bookmark.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-colors group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-lg">
                          {bookmark.favicon || <Globe className="h-4 w-4 text-yellow-600" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{bookmark.title}</div>
                          <div className="text-xs text-muted-foreground truncate">{bookmark.url}</div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Add */}
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-200/50">
            <h3 className="mb-4">Add New Bookmark</h3>
            <div className="flex gap-2">
              <Input placeholder="Enter URL..." className="flex-1" />
              <Button className="bg-yellow-600 hover:bg-yellow-700">
                <Star className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
