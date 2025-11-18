import { AshokaChakra } from "./AshokaChakra";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Puzzle, Search, Trash2, Settings as SettingsIcon } from "lucide-react";
import { useState } from "react";

interface Extension {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  version: string;
}

export function ExtensionsPage() {
  const [extensions, setExtensions] = useState<Extension[]>([
    {
      id: "1",
      name: "Grammarly",
      description: "Writing assistant for grammar and spell checking",
      icon: "✍️",
      enabled: true,
      version: "14.1097.0"
    },
    {
      id: "2",
      name: "AdBlock",
      description: "Block ads and pop-ups on websites",
      icon: "🛡️",
      enabled: true,
      version: "5.17.0"
    },
    {
      id: "3",
      name: "Dark Reader",
      description: "Dark mode for every website",
      icon: "🌙",
      enabled: false,
      version: "4.9.76"
    },
    {
      id: "4",
      name: "JSON Viewer",
      description: "Beautiful JSON formatting for developers",
      icon: "📋",
      enabled: true,
      version: "2.0.1"
    },
  ]);

  const toggleExtension = (id: string) => {
    setExtensions(extensions.map(ext => 
      ext.id === id ? { ...ext, enabled: !ext.enabled } : ext
    ));
  };

  return (
    <div className="h-full w-full overflow-auto">
      <div className="min-h-full relative bg-gradient-to-br from-violet-50 via-white to-purple-50">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle, #7C3AED 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
        
        <div className="absolute top-10 right-10 w-64 h-64 opacity-10">
          <AshokaChakra size={256} className="text-violet-700 animate-spin" style={{ animationDuration: '60s' }} />
        </div>

        <div className="relative z-10 p-8 max-w-6xl mx-auto space-y-6">
          <div className="text-center space-y-4 mb-8">
            <div className="flex items-center justify-center gap-3">
              <Puzzle className="h-12 w-12 text-violet-700" />
              <h1 className="text-4xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                Extensions
              </h1>
            </div>
            <p className="text-muted-foreground italic">
              विस्तार - Enhance Your Browser
            </p>
          </div>

          {/* Search */}
          <Card className="p-4 bg-white/80 backdrop-blur-sm">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search extensions..."
                  className="pl-10"
                />
              </div>
              <Button className="bg-violet-600 hover:bg-violet-700">
                Browse Store
              </Button>
            </div>
          </Card>

          {/* Installed Extensions */}
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-violet-200/50">
            <h3 className="mb-6">Installed Extensions</h3>
            <div className="space-y-4">
              {extensions.map((extension) => (
                <div
                  key={extension.id}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                    extension.enabled ? 'bg-violet-50' : 'bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                    {extension.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{extension.name}</div>
                    <div className="text-sm text-muted-foreground">{extension.description}</div>
                    <div className="text-xs text-muted-foreground mt-1">Version {extension.version}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={extension.enabled}
                      onCheckedChange={() => toggleExtension(extension.id)}
                    />
                    <Button variant="outline" size="icon">
                      <SettingsIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Extension Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 bg-gradient-to-br from-violet-50 to-white border-violet-200/50">
              <div className="text-center">
                <div className="text-2xl mb-1">{extensions.length}</div>
                <div className="text-sm text-muted-foreground">Total Extensions</div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-white border-purple-200/50">
              <div className="text-center">
                <div className="text-2xl mb-1">
                  {extensions.filter(e => e.enabled).length}
                </div>
                <div className="text-sm text-muted-foreground">Enabled</div>
              </div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-fuchsia-50 to-white border-fuchsia-200/50">
              <div className="text-center">
                <div className="text-2xl mb-1">12.5 MB</div>
                <div className="text-sm text-muted-foreground">Total Size</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
