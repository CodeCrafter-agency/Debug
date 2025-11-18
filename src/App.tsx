import { useState, useEffect } from "react";
import { BrowserChrome } from "./components/BrowserChrome";
import { BrowserContent } from "./components/BrowserContent";
import { StudyModePanel } from "./components/StudyModePanel";
import { Button } from "./components/ui/button";
import { GraduationCap, Shield, BookMarked, Download, Puzzle } from "lucide-react";
import { Toaster } from "./components/ui/sonner";

interface Tab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
}

interface HistoryItem {
  url: string;
  timestamp: number;
}

export default function App() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', title: 'New Tab', url: 'about:blank', favicon: '🏠' },
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [studyModeEnabled, setStudyModeEnabled] = useState(false);
  const [vpnEnabled, setVpnEnabled] = useState(false);
  const [splitScreenEnabled, setSplitScreenEnabled] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(-1);
  const [incognitoMode, setIncognitoMode] = useState(false);

  const handleNewTab = () => {
    const newId = String(Date.now());
    const newTab: Tab = {
      id: newId,
      title: 'New Tab',
      url: 'about:blank',
      favicon: '🏠',
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newId);
  };

  const handleTabClose = (id: string) => {
    const newTabs = tabs.filter(tab => tab.id !== id);
    if (newTabs.length === 0) {
      handleNewTab();
    } else {
      setTabs(newTabs);
      if (activeTabId === id) {
        setActiveTabId(newTabs[0].id);
      }
    }
  };

  const handleNavigate = (url: string) => {
    // Add to history
    const activeTab = tabs.find(tab => tab.id === activeTabId);
    if (activeTab && activeTab.url !== url) {
      setHistory([...history.slice(0, currentHistoryIndex + 1), { url, timestamp: Date.now() }]);
      setCurrentHistoryIndex(currentHistoryIndex + 1);
    }

    // Update tab
    setTabs(tabs.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, url, title: getTitleFromUrl(url), favicon: getFaviconFromUrl(url) }
        : tab
    ));
  };

  const getFaviconFromUrl = (url: string): string => {
    if (url === 'about:blank' || url === '') return '🏠';
    if (url === 'hindustan://study-mode') return '🎓';
    if (url === 'hindustan://vpn') return '🛡️';
    if (url === 'hindustan://settings') return '⚙️';
    if (url === 'hindustan://bookmarks') return '⭐';
    if (url === 'hindustan://history') return '🕐';
    if (url === 'hindustan://downloads') return '📥';
    if (url === 'hindustan://extensions') return '🧩';
    // For external URLs, return globe emoji
    return '🌐';
  };

  const getTitleFromUrl = (url: string): string => {
    if (url === 'about:blank' || url === '') return 'New Tab';
    if (url === 'hindustan://study-mode') return 'Study Mode';
    if (url === 'hindustan://vpn') return 'VPN';
    if (url === 'hindustan://settings') return 'Settings';
    if (url === 'hindustan://bookmarks') return 'Bookmarks';
    if (url === 'hindustan://history') return 'History';
    if (url === 'hindustan://downloads') return 'Downloads';
    if (url === 'hindustan://extensions') return 'Extensions';
    return url;
  };

  const handleNewWindow = () => {
    // In a real browser, this would open a new window
    console.log('Opening new window');
  };

  const handleNewIncognito = () => {
    setIncognitoMode(true);
    const newId = String(Date.now());
    const newTab: Tab = {
      id: newId,
      title: 'New Incognito Tab',
      url: 'about:blank',
      favicon: '🕶️',
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newId);
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 10, 25));
  };

  const handleZoomReset = () => {
    setZoom(100);
  };

  const handleBack = () => {
    if (currentHistoryIndex > 0) {
      const newIndex = currentHistoryIndex - 1;
      const previousUrl = history[newIndex].url;
      setCurrentHistoryIndex(newIndex);
      setTabs(tabs.map(tab => 
        tab.id === activeTabId 
          ? { ...tab, url: previousUrl, title: getTitleFromUrl(previousUrl) }
          : tab
      ));
    }
  };

  const handleForward = () => {
    if (currentHistoryIndex < history.length - 1) {
      const newIndex = currentHistoryIndex + 1;
      const nextUrl = history[newIndex].url;
      setCurrentHistoryIndex(newIndex);
      setTabs(tabs.map(tab => 
        tab.id === activeTabId 
          ? { ...tab, url: nextUrl, title: getTitleFromUrl(nextUrl) }
          : tab
      ));
    }
  };

  const handleReload = () => {
    // Force re-render by updating timestamp
    const activeTab = tabs.find(tab => tab.id === activeTabId);
    if (activeTab) {
      setTabs([...tabs]);
    }
  };

  const handleHome = () => {
    handleNavigate('about:blank');
  };

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  return (
    <div className="size-full flex flex-col overflow-hidden bg-background">
      <Toaster position="bottom-right" />
      {/* Browser Chrome (tabs, address bar, controls) */}
      <BrowserChrome
        tabs={tabs}
        activeTabId={activeTabId}
        onTabClick={setActiveTabId}
        onTabClose={handleTabClose}
        onNewTab={handleNewTab}
        onNewWindow={handleNewWindow}
        onNewIncognito={handleNewIncognito}
        onNavigate={handleNavigate}
        onBack={handleBack}
        onForward={handleForward}
        onReload={handleReload}
        onHome={handleHome}
        canGoBack={currentHistoryIndex > 0}
        canGoForward={currentHistoryIndex < history.length - 1}
        studyModeEnabled={studyModeEnabled}
        onToggleStudyMode={() => setStudyModeEnabled(!studyModeEnabled)}
        vpnEnabled={vpnEnabled}
        onToggleVPN={() => setVpnEnabled(!vpnEnabled)}
        splitScreenEnabled={splitScreenEnabled}
        onToggleSplitScreen={() => setSplitScreenEnabled(!splitScreenEnabled)}
        sidebarVisible={sidebarVisible}
        onToggleSidebar={() => setSidebarVisible(!sidebarVisible)}
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomReset={handleZoomReset}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar (optional) */}
        {sidebarVisible && (
          <div className="w-64 border-r border-border bg-muted/30 p-4 overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🇮🇳</span>
              <h3>Quick Access</h3>
            </div>
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => handleNavigate('hindustan://study-mode')}
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                Study Mode
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => handleNavigate('hindustan://vpn')}
              >
                <Shield className="h-4 w-4 mr-2" />
                VPN
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => handleNavigate('hindustan://bookmarks')}
              >
                <BookMarked className="h-4 w-4 mr-2" />
                Bookmarks
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => handleNavigate('hindustan://downloads')}
              >
                <Download className="h-4 w-4 mr-2" />
                Downloads
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => handleNavigate('hindustan://extensions')}
              >
                <Puzzle className="h-4 w-4 mr-2" />
                Extensions
              </Button>
            </div>
          </div>
        )}

        {/* Browser Content */}
        <div className="flex-1 overflow-hidden" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left', width: `${10000 / zoom}%`, height: `${10000 / zoom}%` }}>
          <BrowserContent
            url={activeTab?.url || 'about:blank'}
            isSplitScreen={splitScreenEnabled}
            splitUrl={activeTab?.url || 'about:blank'}
            onNavigate={handleNavigate}
            zoom={zoom}
          />
        </div>

        {/* Study Mode Panel */}
        {studyModeEnabled && (
          <StudyModePanel onClose={() => setStudyModeEnabled(false)} />
        )}
      </div>
    </div>
  );
}
