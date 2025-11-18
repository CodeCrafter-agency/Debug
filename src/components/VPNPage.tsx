import { useState, useEffect } from "react";
import { AshokaChakra } from "./AshokaChakra";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import {
  Shield,
  Globe,
  Lock,
  Zap,
  Eye,
  EyeOff,
  Server,
  Wifi,
  Activity,
  MapPin,
  Clock,
  Download,
  Upload,
  Check,
  AlertTriangle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ServerLocation {
  id: string;
  city: string;
  country: string;
  flag: string;
  ping: number;
  load: number;
}

const INDIAN_SERVERS: ServerLocation[] = [
  { id: "1", city: "Mumbai", country: "India", flag: "🇮🇳", ping: 12, load: 45 },
  { id: "2", city: "Delhi", country: "India", flag: "🇮🇳", ping: 15, load: 38 },
  { id: "3", city: "Bangalore", country: "India", flag: "🇮🇳", ping: 18, load: 52 },
  { id: "4", city: "Chennai", country: "India", flag: "🇮🇳", ping: 20, load: 41 },
  { id: "5", city: "Hyderabad", country: "India", flag: "🇮🇳", ping: 16, load: 35 },
];

const INTERNATIONAL_SERVERS: ServerLocation[] = [
  { id: "6", city: "Singapore", country: "Singapore", flag: "🇸🇬", ping: 45, load: 60 },
  { id: "7", city: "Tokyo", country: "Japan", flag: "🇯🇵", ping: 78, load: 55 },
  { id: "8", city: "London", country: "UK", flag: "🇬🇧", ping: 120, load: 48 },
  { id: "9", city: "New York", country: "USA", flag: "🇺🇸", ping: 180, load: 62 },
];

export function VPNPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedServer, setSelectedServer] = useState<ServerLocation>(INDIAN_SERVERS[0]);
  const [connectionTime, setConnectionTime] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [dataUsed, setDataUsed] = useState(0);
  const [killSwitchEnabled, setKillSwitchEnabled] = useState(false);
  const [autoConnectEnabled, setAutoConnectEnabled] = useState(false);

  // Simulate connection timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setConnectionTime((prev) => prev + 1);
        // Simulate bandwidth fluctuation
        setDownloadSpeed(Math.floor(Math.random() * 50) + 50);
        setUploadSpeed(Math.floor(Math.random() * 30) + 20);
        setDataUsed((prev) => prev + Math.random() * 0.5);
      }, 1000);
    } else {
      setConnectionTime(0);
      setDownloadSpeed(0);
      setUploadSpeed(0);
    }
    return () => clearInterval(interval);
  }, [isConnected]);

  const handleConnect = async () => {
    if (isConnected) {
      setIsConnected(false);
      setConnectionTime(0);
      return;
    }

    setIsConnecting(true);
    // Simulate connection delay
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const allServers = [...INDIAN_SERVERS, ...INTERNATIONAL_SERVERS];

  return (
    <div className="h-full w-full overflow-auto">
      {/* Indian Heritage Pattern Background */}
      <div className="min-h-full relative bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Decorative Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle, #000080 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />
        
        {/* Decorative Ashoka Chakra elements */}
        <div className="absolute top-10 right-10 w-64 h-64 opacity-10">
          <AshokaChakra size={256} className="text-blue-700 animate-spin" style={{ animationDuration: '60s' }} />
        </div>
        <div className="absolute bottom-10 left-10 w-48 h-48 opacity-10">
          <AshokaChakra size={192} className="text-indigo-700 animate-spin" style={{ animationDuration: '80s', animationDirection: 'reverse' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-4 mb-8">
            <div className="flex items-center justify-center gap-3">
              <Shield className="h-12 w-12 text-blue-700" />
              <h1 className="text-4xl bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                Hindustan VPN
              </h1>
            </div>
            <p className="text-muted-foreground italic">
              सुरक्षा सर्वोपरि - Security Above All
            </p>
            <div className="flex items-center justify-center gap-2">
              <Badge variant={isConnected ? "default" : "secondary"} className={isConnected ? "bg-green-600" : ""}>
                {isConnected ? (
                  <>
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                    Connected
                  </>
                ) : "Disconnected"}
              </Badge>
            </div>
          </div>

          {/* Main Connection Card */}
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200/50">
              {/* Connection Status */}
              <div className="flex flex-col items-center space-y-6">
                {/* Visual Connection Indicator */}
                <div className="relative">
                  <div className={`w-48 h-48 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isConnected 
                      ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/50' 
                      : isConnecting
                      ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/50 animate-pulse'
                      : 'bg-gradient-to-br from-gray-300 to-gray-400'
                  }`}>
                    <Shield className="h-24 w-24 text-white" />
                  </div>
                  {isConnected && (
                    <div className="absolute inset-0 rounded-full border-4 border-green-400 animate-ping opacity-75" />
                  )}
                </div>

                {/* Server Info */}
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl">{selectedServer.flag}</span>
                    <h3 className="text-xl">{selectedServer.city}, {selectedServer.country}</h3>
                  </div>
                  {isConnected && (
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatTime(connectionTime)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="h-4 w-4" />
                        {selectedServer.ping}ms
                      </div>
                    </div>
                  )}
                </div>

                {/* Connect Button */}
                <Button
                  size="lg"
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className={`w-full max-w-xs h-14 text-lg ${
                    isConnected
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                  }`}
                >
                  {isConnecting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Connecting...
                    </>
                  ) : isConnected ? (
                    <>
                      <Lock className="h-5 w-5 mr-2" />
                      Disconnect
                    </>
                  ) : (
                    <>
                      <Shield className="h-5 w-5 mr-2" />
                      Connect VPN
                    </>
                  )}
                </Button>

                {/* IP Address Display */}
                {isConnected && (
                  <Card className="w-full bg-green-50/50 border-green-200">
                    <div className="p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Your IP:</span>
                        <span className="font-mono">192.168.1.xxx (Hidden)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">VPN IP:</span>
                        <span className="font-mono">103.21.244.45</span>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </Card>
          </div>

          {/* Stats Grid */}
          {isConnected && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Download</p>
                    <h3 className="text-2xl mt-1">{downloadSpeed} Mbps</h3>
                  </div>
                  <Download className="h-10 w-10 text-green-600" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Upload</p>
                    <h3 className="text-2xl mt-1">{uploadSpeed} Mbps</h3>
                  </div>
                  <Upload className="h-10 w-10 text-blue-600" />
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-purple-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Data Used</p>
                    <h3 className="text-2xl mt-1">{dataUsed.toFixed(1)} MB</h3>
                  </div>
                  <Activity className="h-10 w-10 text-purple-600" />
                </div>
              </Card>
            </div>
          )}

          {/* Server Selection and Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Server Selection */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-blue-200/50">
              <h3 className="flex items-center gap-2 mb-4">
                <Server className="h-5 w-5 text-blue-600" />
                Server Locations
              </h3>

              <div className="space-y-4">
                {/* Indian Servers */}
                <div>
                  <h4 className="text-sm mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    India 🇮🇳
                  </h4>
                  <div className="space-y-2">
                    {INDIAN_SERVERS.map((server) => (
                      <button
                        key={server.id}
                        onClick={() => !isConnected && setSelectedServer(server)}
                        disabled={isConnected}
                        className={`w-full p-3 rounded-lg border flex items-center justify-between transition-all ${
                          selectedServer.id === server.id
                            ? 'bg-blue-100 border-blue-500'
                            : 'bg-white hover:bg-blue-50 border-gray-200'
                        } ${isConnected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{server.flag}</span>
                          <div className="text-left">
                            <div className="flex items-center gap-2">
                              <span>{server.city}</span>
                              {selectedServer.id === server.id && (
                                <Check className="h-4 w-4 text-blue-600" />
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              Load: {server.load}% · {server.ping}ms
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 h-6 rounded-full ${
                                i < Math.floor((100 - server.load) / 20)
                                  ? 'bg-green-500'
                                  : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* International Servers */}
                <div>
                  <h4 className="text-sm mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    International
                  </h4>
                  <div className="space-y-2">
                    {INTERNATIONAL_SERVERS.map((server) => (
                      <button
                        key={server.id}
                        onClick={() => !isConnected && setSelectedServer(server)}
                        disabled={isConnected}
                        className={`w-full p-3 rounded-lg border flex items-center justify-between transition-all ${
                          selectedServer.id === server.id
                            ? 'bg-blue-100 border-blue-500'
                            : 'bg-white hover:bg-blue-50 border-gray-200'
                        } ${isConnected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{server.flag}</span>
                          <div className="text-left">
                            <div className="flex items-center gap-2">
                              <span>{server.city}</span>
                              {selectedServer.id === server.id && (
                                <Check className="h-4 w-4 text-blue-600" />
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              Load: {server.load}% · {server.ping}ms
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 h-6 rounded-full ${
                                i < Math.floor((100 - server.load) / 20)
                                  ? 'bg-green-500'
                                  : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Security Settings */}
            <div className="space-y-6">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-2 border-indigo-200/50">
                <h3 className="flex items-center gap-2 mb-4">
                  <Lock className="h-5 w-5 text-indigo-600" />
                  Security Settings
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <span>Kill Switch</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Block internet if VPN disconnects
                      </p>
                    </div>
                    <Switch
                      checked={killSwitchEnabled}
                      onCheckedChange={setKillSwitchEnabled}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-600" />
                        <span>Auto-Connect</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Connect automatically on startup
                      </p>
                    </div>
                    <Switch
                      checked={autoConnectEnabled}
                      onCheckedChange={setAutoConnectEnabled}
                    />
                  </div>

                  <Separator />

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Encryption</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      AES-256-GCM Military Grade
                    </p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Privacy Policy</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Zero logs policy · No data tracking
                    </p>
                  </div>
                </div>
              </Card>

              {/* Features List */}
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200/50">
                <h3 className="mb-4">VPN Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Unlimited bandwidth</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>No activity logs</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Multiple protocols support</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Built-in ad blocker</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Split tunneling</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
