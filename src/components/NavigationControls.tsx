import { ChevronLeft, ChevronRight, RotateCw, Home } from "lucide-react";
import { Button } from "./ui/button";

interface NavigationControlsProps {
  canGoBack?: boolean;
  canGoForward?: boolean;
  onBack: () => void;
  onForward: () => void;
  onReload: () => void;
  onHome: () => void;
}

export function NavigationControls({
  canGoBack = true,
  canGoForward = false,
  onBack,
  onForward,
  onReload,
  onHome,
}: NavigationControlsProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={onBack}
        disabled={!canGoBack}
        className="h-8 w-8"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onForward}
        disabled={!canGoForward}
        className="h-8 w-8"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onReload}
        className="h-8 w-8"
      >
        <RotateCw className="h-5 w-5" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onHome}
        className="h-8 w-8"
      >
        <Home className="h-5 w-5" />
      </Button>
    </div>
  );
}
