import { X } from "lucide-react";
import { Button } from "./ui/button";

interface BrowserTabProps {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  isActive: boolean;
  onClose: () => void;
  onClick: () => void;
}

export function BrowserTab({
  title,
  favicon,
  isActive,
  onClose,
  onClick,
}: BrowserTabProps) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-2 px-3 py-2 min-w-[180px] max-w-[240px] cursor-pointer
        border-r border-border/50 group relative
        ${isActive 
          ? 'bg-background' 
          : 'bg-muted/30 hover:bg-muted/50'
        }
      `}
    >
      {/* Favicon */}
      <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
        {favicon ? (
          <span className="text-sm">{favicon}</span>
        ) : (
          <div className="w-full h-full bg-muted rounded-sm" />
        )}
      </div>

      {/* Title */}
      <span className="flex-1 truncate text-sm">
        {title || "New Tab"}
      </span>

      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-5 w-5 opacity-0 group-hover:opacity-100 hover:bg-destructive/10 flex-shrink-0"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}
