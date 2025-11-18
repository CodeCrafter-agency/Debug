import { NewTabPage } from "./NewTabPage";
import { StudyModePage } from "./StudyModePage";
import { VPNPage } from "./VPNPage";
import { SettingsPage } from "./SettingsPage";
import { BookmarksPage } from "./BookmarksPage";
import { HistoryPage } from "./HistoryPage";
import { DownloadsPage } from "./DownloadsPage";
import { ExtensionsPage } from "./ExtensionsPage";

interface BrowserContentProps {
  url: string;
  isSplitScreen?: boolean;
  splitUrl?: string;
  onNavigate: (url: string) => void;
  zoom?: number;
}

export function BrowserContent({ url, isSplitScreen, splitUrl, onNavigate, zoom = 100 }: BrowserContentProps) {
  const renderWebPage = (pageUrl: string) => {
    // Mock web page content
    if (pageUrl === '' || pageUrl === 'about:blank') {
      return <NewTabPage onNavigate={onNavigate} />;
    }
    
    // Study Mode Page
    if (pageUrl === 'hindustan://study-mode') {
      return <StudyModePage />;
    }
    
    // VPN Page
    if (pageUrl === 'hindustan://vpn') {
      return <VPNPage />;
    }
    
    // Settings Page
    if (pageUrl === 'hindustan://settings') {
      return <SettingsPage />;
    }
    
    // Bookmarks Page
    if (pageUrl === 'hindustan://bookmarks') {
      return <BookmarksPage />;
    }
    
    // History Page
    if (pageUrl === 'hindustan://history') {
      return <HistoryPage />;
    }
    
    // Downloads Page
    if (pageUrl === 'hindustan://downloads') {
      return <DownloadsPage />;
    }
    
    // Extensions Page
    if (pageUrl === 'hindustan://extensions') {
      return <ExtensionsPage />;
    }

    // Mock content for demonstration
    return (
      <div className="h-full overflow-auto bg-white">
        <div className="max-w-4xl mx-auto p-8 space-y-4">
          <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-4/6 bg-gray-100 rounded animate-pulse" />
          <div className="h-64 w-full bg-gray-200 rounded animate-pulse mt-8" />
          <div className="space-y-2 pt-4">
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  };

  if (isSplitScreen && splitUrl) {
    return (
      <div className="flex h-full">
        <div className="flex-1 border-r border-border">
          {renderWebPage(url)}
        </div>
        <div className="flex-1">
          {renderWebPage(splitUrl)}
        </div>
      </div>
    );
  }

  return renderWebPage(url);
}
