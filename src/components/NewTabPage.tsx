import { useState } from "react";
import { AshokaChakra } from "./AshokaChakra";
import { Button } from "./ui/button";
import { GraduationCap, Shield, Split, BookMarked, Clock, Lightbulb } from "lucide-react";

interface NewTabPageProps {
  onNavigate: (url: string) => void;
}

export function NewTabPage({ onNavigate }: NewTabPageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(searchQuery);
    }
  };

  return (
    <div className="h-full w-full relative overflow-hidden">
      {/* Indian-themed gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-white to-green-100" />
      
      {/* Decorative gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Logo with Ashoka Chakra */}
        <div className="mb-12 flex flex-col items-center gap-4">
          <div className="relative">
            <AshokaChakra className="text-blue-700" size={80} />
          </div>
          <h1 className="text-4xl bg-gradient-to-r from-orange-600 via-blue-700 to-green-700 bg-clip-text text-transparent">
            Hindustan Browser
          </h1>
          <p className="text-muted-foreground">
            Empowering Indian Students & Developers
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl mb-12">
          <div className="relative">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-4 shadow-lg border border-white/50 hover:shadow-xl transition-all">
              <AshokaChakra className="text-blue-700 flex-shrink-0" size={24} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search the web or enter URL..."
                className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </form>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full">
          <div 
            onClick={() => onNavigate('hindustan://study-mode')}
            className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/50 hover:bg-white/80 hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg">Study Mode</h3>
              <p className="text-sm text-muted-foreground">
                Dedicated tools and widgets for focused learning
              </p>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('hindustan://vpn')}
            className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/50 hover:bg-white/80 hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg">Built-in VPN</h3>
              <p className="text-sm text-muted-foreground">
                Secure and private browsing for developers
              </p>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/50 hover:bg-white/80 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                <Split className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg">Split Screen</h3>
              <p className="text-sm text-muted-foreground">
                View multiple tabs side by side
              </p>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Button 
            variant="ghost" 
            className="bg-white/40 backdrop-blur-sm border border-white/50 hover:bg-white/60 hover:shadow-md transition-all"
            onClick={() => onNavigate('hindustan://bookmarks')}
          >
            <BookMarked className="h-4 w-4 mr-2" />
            Bookmarks
          </Button>
          <Button 
            variant="ghost" 
            className="bg-white/40 backdrop-blur-sm border border-white/50 hover:bg-white/60 hover:shadow-md transition-all"
            onClick={() => onNavigate('hindustan://history')}
          >
            <Clock className="h-4 w-4 mr-2" />
            History
          </Button>
          <Button 
            variant="ghost" 
            className="bg-white/40 backdrop-blur-sm border border-white/50 hover:bg-white/60 hover:shadow-md transition-all"
            onClick={() => onNavigate('hindustan://settings')}
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
