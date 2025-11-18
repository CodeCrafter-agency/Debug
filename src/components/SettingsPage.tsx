import { useState } from "react";
import { AshokaChakra } from "./AshokaChakra";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Settings,
  Globe,
  Shield,
  Bell,
  Eye,
  Download,
  Trash2,
  Moon,
  Sun,
  Zap,
  Lock,
  Database,
  Palette,
  Monitor,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoUpdates, setAutoUpdates] = useState(true);
  const [saveHistory, setSaveHistory] = useState(true);
  const [cookies, setCookies] = useState(true);
  const [popupBlocker, setPopupBlocker] = useState(true);
  const [defaultSearchEngine, setDefaultSearchEngine] = useState("google");
  const [homepage, setHomepage] = useState("hindustan://new-tab");

  return (
    <div className="h-full w-full overflow-auto">
      {/* Indian Heritage Pattern Background */}
      <div className="min-h-full relative bg-gradient-to-br from-purple-50 via-white to-pink-50">
        {/* Decorative Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle, #800080 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
        
        {/* Decorative Ashoka Chakra elements */}
        <div className="absolute top-10 right-10 w-64 h-64 opacity-10">
          <AshokaChakra size={256} className="text-purple-700 animate-spin" style={{ animationDuration: '60s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="flex items-center justify-center gap-3">
              <Settings className="h-12 w-12 text-purple-700" />
              <h1 className="text-4xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Browser Settings
              </h1>
            </div>
            <p className="text-muted-foreground italic">
              अनुकूलन आपकी शक्ति - Customize Your Experience
            </p>
          </div>

          {/* Settings Tabs */}
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="appearance">Appearance</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-purple-200/50">
                <h3 className="flex items-center gap-2 mb-6">
                  <Globe className="h-5 w-5 text-purple-600" />
                  General Settings
                </h3>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="homepage">Homepage</Label>
                    <Input
                      id="homepage"
                      value={homepage}
                      onChange={(e) => setHomepage(e.target.value)}
                      placeholder="Enter homepage URL"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="search-engine">Default Search Engine</Label>
                    <Select value={defaultSearchEngine} onValueChange={setDefaultSearchEngine}>
                      <SelectTrigger id="search-engine">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="google">Google</SelectItem>
                        <SelectItem value="bing">Bing</SelectItem>
                        <SelectItem value="duckduckgo">DuckDuckGo</SelectItem>
                        <SelectItem value="yahoo">Yahoo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Auto-Update</Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically update Hindustan Browser
                      </p>
                    </div>
                    <Switch
                      checked={autoUpdates}
                      onCheckedChange={setAutoUpdates}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Notifications</Label>
                      <p className="text-xs text-muted-foreground">
                        Show desktop notifications
                      </p>
                    </div>
                    <Switch
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-blue-200/50">
                <h3 className="flex items-center gap-2 mb-4">
                  <Download className="h-5 w-5 text-blue-600" />
                  Downloads
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="download-location">Download Location</Label>
                    <div className="flex gap-2">
                      <Input
                        id="download-location"
                        value="/home/user/Downloads"
                        readOnly
                      />
                      <Button variant="outline">Browse</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy" className="space-y-6">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-green-200/50">
                <h3 className="flex items-center gap-2 mb-6">
                  <Shield className="h-5 w-5 text-green-600" />
                  Privacy & Security
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Save Browsing History</Label>
                      <p className="text-xs text-muted-foreground">
                        Keep track of pages you visit
                      </p>
                    </div>
                    <Switch
                      checked={saveHistory}
                      onCheckedChange={setSaveHistory}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Accept Cookies</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow websites to save cookies
                      </p>
                    </div>
                    <Switch
                      checked={cookies}
                      onCheckedChange={setCookies}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Block Pop-ups</Label>
                      <p className="text-xs text-muted-foreground">
                        Prevent pop-up windows
                      </p>
                    </div>
                    <Switch
                      checked={popupBlocker}
                      onCheckedChange={setPopupBlocker}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Clear Browsing Data</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear History
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear Cookies
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear Cache
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200/50">
                <h3 className="flex items-center gap-2 mb-4">
                  <Lock className="h-5 w-5 text-blue-600" />
                  Security Features
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Built-in VPN Protection</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>HTTPS-Only Mode</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Tracking Protection</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Phishing Protection</span>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Appearance Settings */}
            <TabsContent value="appearance" className="space-y-6">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-orange-200/50">
                <h3 className="flex items-center gap-2 mb-6">
                  <Palette className="h-5 w-5 text-orange-600" />
                  Appearance
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="flex items-center gap-2">
                        {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                        Dark Mode
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Use dark theme for the browser
                      </p>
                    </div>
                    <Switch
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Theme Color</Label>
                    <div className="grid grid-cols-6 gap-2">
                      {[
                        { color: 'bg-orange-500', name: 'Saffron' },
                        { color: 'bg-blue-600', name: 'Navy Blue' },
                        { color: 'bg-green-600', name: 'Green' },
                        { color: 'bg-purple-600', name: 'Purple' },
                        { color: 'bg-pink-500', name: 'Pink' },
                        { color: 'bg-red-600', name: 'Red' },
                      ].map((theme) => (
                        <button
                          key={theme.name}
                          className={`${theme.color} h-12 rounded-lg border-2 border-gray-300 hover:border-gray-900 transition-all`}
                          title={theme.name}
                        />
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="zoom">Page Zoom</Label>
                    <Select defaultValue="100">
                      <SelectTrigger id="zoom">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="75">75%</SelectItem>
                        <SelectItem value="90">90%</SelectItem>
                        <SelectItem value="100">100%</SelectItem>
                        <SelectItem value="110">110%</SelectItem>
                        <SelectItem value="125">125%</SelectItem>
                        <SelectItem value="150">150%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="font-size">Font Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="font-size">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="xlarge">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Advanced Settings */}
            <TabsContent value="advanced" className="space-y-6">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-indigo-200/50">
                <h3 className="flex items-center gap-2 mb-6">
                  <Zap className="h-5 w-5 text-indigo-600" />
                  Advanced Settings
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Hardware Acceleration</Label>
                      <p className="text-xs text-muted-foreground">
                        Use GPU for better performance
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Prefetch Resources</Label>
                      <p className="text-xs text-muted-foreground">
                        Load pages faster by predicting links
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="cache-size">Cache Size (MB)</Label>
                    <Input
                      id="cache-size"
                      type="number"
                      defaultValue="500"
                      min="100"
                      max="2000"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>System</Label>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between p-2 bg-muted rounded">
                        <span>Version:</span>
                        <span className="font-mono">1.0.0</span>
                      </div>
                      <div className="flex justify-between p-2 bg-muted rounded">
                        <span>Engine:</span>
                        <span className="font-mono">Chromium</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <Button variant="destructive" className="w-full">
                    Reset All Settings
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* About Section */}
          <Card className="p-6 bg-gradient-to-br from-orange-50 via-white to-green-50 border-2 border-orange-200/50">
            <div className="flex items-center gap-4">
              <AshokaChakra size={64} className="text-blue-700" />
              <div>
                <h3>Hindustan Browser v1.0.0</h3>
                <p className="text-sm text-muted-foreground">
                  Made with ❤️ for Indian Students & Developers
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  © 2025 Hindustan Browser. All rights reserved.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
