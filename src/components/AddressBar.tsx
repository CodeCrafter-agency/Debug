import { Search, Lock, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner@2.0.3";

interface AddressBarProps {
  url: string;
  isSecure?: boolean;
  onNavigate: (url: string) => void;
  onBookmark?: () => void;
}

export function AddressBar({ url, isSecure = true, onNavigate, onBookmark }: AddressBarProps) {
  const [inputValue, setInputValue] = useState(url);
  const [isFocused, setIsFocused] = useState(false);

  // Update input when URL changes from external source
  useEffect(() => {
    if (!isFocused) {
      setInputValue(url);
    }
  }, [url, isFocused]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onNavigate(inputValue);
      setIsFocused(false);
    }
  };

  const handleBookmark = () => {
    if (onBookmark) {
      onBookmark();
    }
    toast.success("Bookmark added!", {
      description: url,
      duration: 2000,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2">
      <div className="flex-1 flex items-center gap-2 bg-input-background rounded-lg px-3 py-2 border border-border/50 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
        {/* Security indicator */}
        <div className="flex-shrink-0">
          {isSecure ? (
            <Lock className="h-4 w-4 text-green-600" />
          ) : (
            <Search className="h-4 w-4 text-muted-foreground" />
          )}
        </div>

        {/* URL Input */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            setInputValue(url); // Reset to actual URL on blur
          }}
          className="flex-1 bg-transparent outline-none text-sm"
          placeholder="Search or type URL"
        />

        {/* Bookmark button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-6 w-6 flex-shrink-0 hover:text-yellow-600 transition-colors"
          onClick={handleBookmark}
        >
          <Star className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
