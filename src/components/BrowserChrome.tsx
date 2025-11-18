import { 
  Plus, Menu, BookMarked, GraduationCap, Shield, Split, Settings, User, Clock, 
  Download, Puzzle, Trash2, ZoomIn, ZoomOut, Maximize2, Printer, Search as SearchIcon,
  Share2, MoreHorizontal, Wallet, Bot, PanelLeft, Eye, EyeOff, KeyRound
} from "lucide-react";
import { Button } from "./ui/button";
import { BrowserTab } from "./BrowserTab";
import { NavigationControls } from "./NavigationControls";
import { AddressBar } from "./AddressBar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Tab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
}

interface BrowserChromeProps {
  tabs: Tab[];
  activeTabId: string;
  onTabClick: (id: string) => void;
  onTabClose: (id: string) => void;
  onNewTab: () => void;
  onNewWindow: () => void;
  onNewIncognito: () => void;
  onNavigate: (url: string) => void;
  onBack: () => void;
  onForward: () => void;
  onReload: () => void;
  onHome: () => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
  studyModeEnabled: boolean;
  onToggleStudyMode: () => void;
  vpnEnabled: boolean;
  onToggleVPN: () => void;
  splitScreenEnabled: boolean;
  onToggleSplitScreen: () => void;
  sidebarVisible: boolean;
  onToggleSidebar: () => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
}

export function BrowserChrome({
  tabs,
  activeTabId,
  onTabClick,
  onTabClose,
  onNewTab,
  onNewWindow,
  onNewIncognito,
  onNavigate,
  onBack,
  onForward,
  onReload,
  onHome,
  canGoBack = false,
  canGoForward = false,
  studyModeEnabled,
  onToggleStudyMode,
  vpnEnabled,
  onToggleVPN,
  splitScreenEnabled,
  onToggleSplitScreen,
  sidebarVisible,
  onToggleSidebar,
  zoom,
  onZoomIn,
  onZoomOut,
  onZoomReset,
}: BrowserChromeProps) {
  const activeTab = tabs.find(tab => tab.id === activeTabId);

  return (
    <div className="flex flex-col w-full border-b border-border">
      {/* Tab Bar */}
      <div className="flex items-center bg-muted/30 border-b border-border/50">
        {/* Logo and Title */}
        <div className="flex items-center gap-2 px-4 py-2 border-r border-border/50">
          <div className="w-6 h-6 flex items-center justify-center">
            <span className="text-base">🇮🇳</span>
          </div>
          <span className="text-sm whitespace-nowrap bg-gradient-to-r from-orange-600 via-blue-700 to-green-700 bg-clip-text text-transparent font-semibold">
            Hindustan
          </span>
        </div>

        {/* Tabs */}
        <div className="flex-1 flex items-center overflow-x-auto">
          {tabs.map((tab) => (
            <BrowserTab
              key={tab.id}
              id={tab.id}
              title={tab.title}
              url={tab.url}
              favicon={tab.favicon}
              isActive={tab.id === activeTabId}
              onClose={() => onTabClose(tab.id)}
              onClick={() => onTabClick(tab.id)}
            />
          ))}
          
          {/* New Tab Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onNewTab}
            className="h-8 w-8 mx-1 flex-shrink-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Feature Toggles */}
        <div className="flex items-center gap-1 px-2 border-l border-border/50">
          <Button
            variant={studyModeEnabled ? "default" : "ghost"}
            size="icon"
            onClick={onToggleStudyMode}
            className="h-8 w-8"
            title="Study Mode"
          >
            <GraduationCap className="h-4 w-4" />
          </Button>
          
          <Button
            variant={vpnEnabled ? "default" : "ghost"}
            size="icon"
            onClick={onToggleVPN}
            className="h-8 w-8"
            title="VPN"
          >
            <Shield className="h-4 w-4" />
            {vpnEnabled && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
            )}
          </Button>
          
          <Button
            variant={splitScreenEnabled ? "default" : "ghost"}
            size="icon"
            onClick={onToggleSplitScreen}
            className="h-8 w-8"
            title="Split Screen"
          >
            <Split className="h-4 w-4" />
          </Button>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-1 px-2 border-l border-border/50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuItem onClick={onNewTab}>
                <Plus className="h-4 w-4 mr-2" />
                New tab
                <span className="ml-auto text-xs text-muted-foreground">Ctrl+T</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onNewWindow}>
                <Plus className="h-4 w-4 mr-2" />
                New window
                <span className="ml-auto text-xs text-muted-foreground">Ctrl+N</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onNewIncognito}>
                <EyeOff className="h-4 w-4 mr-2" />
                New incognito window
                <span className="ml-auto text-xs text-muted-foreground">Ctrl+Shift+N</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={() => onNavigate('hindustan://study-mode')}>
                <GraduationCap className="h-4 w-4 mr-2" />
                Study Mode
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('hindustan://vpn')}>
                <Shield className="h-4 w-4 mr-2" />
                VPN
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <PanelLeft className="h-4 w-4" />
                    <span>Sidebar</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 px-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSidebar();
                    }}
                  >
                    {sidebarVisible ? 'On' : 'Off'}
                  </Button>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={() => onNavigate('hindustan://history')}>
                <Clock className="h-4 w-4 mr-2" />
                History
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('hindustan://bookmarks')}>
                <BookMarked className="h-4 w-4 mr-2" />
                Bookmarks and lists
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('hindustan://downloads')}>
                <Download className="h-4 w-4 mr-2" />
                Downloads
                <span className="ml-auto text-xs text-muted-foreground">Ctrl+J</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNavigate('hindustan://extensions')}>
                <Puzzle className="h-4 w-4 mr-2" />
                Extensions
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span>Zoom</span>
                    <span className="text-sm text-muted-foreground">{zoom}%</span>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        onZoomOut();
                      }}
                    >
                      -
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        onZoomReset();
                      }}
                    >
                      ○
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        onZoomIn();
                      }}
                    >
                      +
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0"
                    >
                      <Maximize2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                <Printer className="h-4 w-4 mr-2" />
                Print...
                <span className="ml-auto text-xs text-muted-foreground">Ctrl+P</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SearchIcon className="h-4 w-4 mr-2" />
                Find and edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="h-4 w-4 mr-2" />
                Save and share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MoreHorizontal className="h-4 w-4 mr-2" />
                More tools
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={() => onNavigate('hindustan://settings')}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                About Hindustan Browser
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Address Bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-background">
        <NavigationControls
          onBack={onBack}
          onForward={onForward}
          onReload={onReload}
          onHome={onHome}
          canGoBack={canGoBack}
          canGoForward={canGoForward}
        />
        
        <Separator orientation="vertical" className="h-6" />
        
        <AddressBar
          url={activeTab?.url || ''}
          onNavigate={onNavigate}
          onBookmark={() => console.log('Bookmark')}
        />

        {/* VPN Status */}
        {vpnEnabled && (
          <>
            <Separator orientation="vertical" className="h-6" />
            <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/20">
              <Shield className="h-3 w-3 mr-1" />
              VPN Active
            </Badge>
          </>
        )}
      </div>

      {/* Bookmarks Bar */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-background border-t border-border/30 text-sm">
        <BookMarked className="h-3 w-3 text-muted-foreground flex-shrink-0" />
        <div className="flex items-center gap-2 overflow-x-auto">
          <Button 
            variant="link" 
            className="h-auto p-0 text-sm hover:text-primary transition-colors flex items-center gap-1" 
            onClick={() => onNavigate('hindustan://study-mode')}
          >
            <span>🎓</span> Study Mode
          </Button>
          <Button 
            variant="link" 
            className="h-auto p-0 text-sm hover:text-primary transition-colors flex items-center gap-1" 
            onClick={() => onNavigate('hindustan://vpn')}
          >
            <span>🛡️</span> VPN
          </Button>
          <Button 
            variant="link" 
            className="h-auto p-0 text-sm hover:text-primary transition-colors flex items-center gap-1" 
            onClick={() => onNavigate('hindustan://downloads')}
          >
            <span>📥</span> Downloads
          </Button>
          <Button 
            variant="link" 
            className="h-auto p-0 text-sm hover:text-primary transition-colors" 
            onClick={() => onNavigate('hindustan://bookmarks')}
          >
            All Bookmarks →
          </Button>
        </div>
      </div>
    </div>
  );
}
