# 🇮🇳 Hindustan Browser

A modern, feature-rich web browser UI prototype built with React, TypeScript, and Tailwind CSS, designed specifically for Indian students and developers.

## ✨ Features

### Core Browser Features
- ✅ Multiple tab management
- ✅ Address bar with search
- ✅ Navigation controls (back, forward, reload, home)
- ✅ Bookmarks manager
- ✅ Browsing history
- ✅ Download manager
- ✅ Extensions manager
- ✅ Settings page
- ✅ Zoom controls (25% - 200%)
- ✅ Collapsible sidebar
- ✅ Incognito mode

### Unique Features
- 🎓 **Study Mode**: Pomodoro timer, task manager, quick notes, and study resources
- 🛡️ **Built-in VPN**: Server selection, connection management, and security features
- 📱 **Split Screen**: View two pages side by side

### Indian Heritage Theme
- Beautiful gradient backgrounds inspired by the Indian flag
- Ashoka Chakra decorative elements
- Sanskrit motivational quotes
- Tricolor design accents

## 🎨 Design

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: ShadCN UI
- **Icons**: Lucide React
- **Theme**: Indian heritage with saffron, white, green, and navy blue colors

## 📁 Project Structure

```
├── App.tsx                      # Main application component
├── components/
│   ├── BrowserChrome.tsx        # Top bar with tabs and controls
│   ├── BrowserContent.tsx       # Main content area
│   ├── BrowserTab.tsx           # Individual tab component
│   ├── AddressBar.tsx           # URL bar
│   ├── NavigationControls.tsx   # Back/forward/reload buttons
│   ├── NewTabPage.tsx           # New tab landing page
│   ├── StudyModePage.tsx        # Study mode with tools
│   ├── StudyModePanel.tsx       # Study mode sidebar panel
│   ├── VPNPage.tsx              # VPN controls
│   ├── SettingsPage.tsx         # Browser settings
│   ├── BookmarksPage.tsx        # Bookmarks manager
│   ├── HistoryPage.tsx          # Browsing history
│   ├── DownloadsPage.tsx        # Download manager
│   ├── ExtensionsPage.tsx       # Extensions manager
│   ├── AshokaChakra.tsx         # Ashoka Chakra SVG component
│   └── ui/                      # ShadCN UI components
└── styles/
    └── globals.css              # Tailwind configuration
```

## 🚀 Getting Started

This is a UI prototype built in Figma Make. To use this code:

1. **Download the code** using the download button in Figma Make
2. **Extract the files** to your local machine
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```

## 📦 Key Dependencies

- React 18
- TypeScript
- Tailwind CSS v4
- Lucide React (icons)
- ShadCN UI components
- Sonner (toast notifications)

## 🔗 Internal URLs

The browser uses special internal URLs:
- `about:blank` - New tab page
- `hindustan://study-mode` - Study mode
- `hindustan://vpn` - VPN controls
- `hindustan://settings` - Settings
- `hindustan://bookmarks` - Bookmarks
- `hindustan://history` - History
- `hindustan://downloads` - Downloads
- `hindustan://extensions` - Extensions

## 🎯 Features for Students

### Study Mode
- **Pomodoro Timer**: 25-minute focus sessions
- **Task Manager**: Track daily tasks
- **Quick Notes**: Take notes while studying
- **Study Resources**: Quick links to educational sites
- **Statistics**: Track study time and streaks

## 🎯 Features for Developers

### Built-in VPN
- Multiple server locations (India + International)
- Connection status monitoring
- Bandwidth tracking
- Security settings (Kill Switch, Auto-Connect)
- Zero-logs policy

## 🎨 Theme Customization

The browser uses a beautiful Indian heritage theme with:
- Saffron/Orange (#FF9933)
- White (#FFFFFF)
- Green (#138808)
- Navy Blue (#000080)

## 📝 Notes

This is a **UI prototype** and not a functional web browser. It demonstrates:
- Modern browser UI/UX patterns
- React component architecture
- State management
- Responsive design
- Accessibility features

For a real browser implementation, you would need:
- WebView/rendering engine integration
- Network stack
- Security infrastructure
- OS integration
- Extension APIs

## 👨‍💻 For PyQt5 Implementation

To convert this to PyQt5:
1. Use `QWebEngineView` for web rendering
2. Map React components to PyQt widgets
3. Implement VPN using system network settings
4. Use `QSplitter` for split screen
5. Store bookmarks/history in SQLite

## 🙏 Credits

Built with ❤️ for Indian students and developers
- Design inspired by modern browsers
- Indian cultural elements and Sanskrit quotes
- Educational focus for students

## 📄 License

This is a prototype project. Feel free to use and modify for educational purposes.

---

**Made in India 🇮🇳**
