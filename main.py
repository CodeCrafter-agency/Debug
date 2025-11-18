import sys
import os
import threading
from urllib.parse import quote_plus
from PyQt5.QtCore import QUrl
from PyQt5.QtWidgets import QApplication, QMainWindow, QToolBar, QAction, QLineEdit, QTabWidget
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEnginePage, QWebEngineProfile
from flask import Flask, send_from_directory

# --- 1. SETUP THE FLASK WEB SERVER ---
# We are pointing to 'ui-react' and the 'build' folder you just created
UI_BUILD_DIR = os.path.join(os.path.dirname(__file__), "ui-react", "build")
PORT = 8080

flask_app = Flask(__name__, static_folder=os.path.join(UI_BUILD_DIR, 'assets'))

@flask_app.route('/')
def serve_index():
    return send_from_directory(UI_BUILD_DIR, 'index.html')

@flask_app.route('/assets/<path:filename>')
def serve_assets(filename):
    return send_from_directory(os.path.join(UI_BUILD_DIR, 'assets'), filename)

# Catch-all for other static files (like vite.svg or public folder items)
@flask_app.route('/<path:filename>')
def serve_root_files(filename):
    return send_from_directory(UI_BUILD_DIR, filename)

def start_server():
    print(f"Serving UI from http://localhost:{PORT}")
    print(f"Looking for files in: {UI_BUILD_DIR}")
    flask_app.run(port=PORT, debug=False, threaded=True)

server_thread = threading.Thread(target=start_server)
server_thread.daemon = True
server_thread.start()
# --- END OF SERVER SETUP ---

class WebEnginePage(QWebEnginePage):
    def acceptNavigationRequest(self, url, _type, isMainFrame):
        if url.scheme() == 'search':
            search_term = url.path()
            search_url = "https://www.google.com/search?q=" + quote_plus(search_term)
            self.load(QUrl(search_url))
            return False
        return super().acceptNavigationRequest(url, _type, isMainFrame)

class MainWindow(QMainWindow):
    def __init__(self, *args, **kwargs):
        super(MainWindow, self).__init__(*args, **kwargs)
        self.tabs = QTabWidget()
        self.tabs.setDocumentMode(True)
        self.tabs.setTabsClosable(True)
        self.tabs.tabCloseRequested.connect(self.close_current_tab)
        self.tabs.currentChanged.connect(self.current_tab_changed)
        self.setCentralWidget(self.tabs)

        navtb = QToolBar("Navigation")
        self.addToolBar(navtb)

        back_btn = QAction("Back", self)
        back_btn.triggered.connect(self.go_back)
        navtb.addAction(back_btn)

        forward_btn = QAction("Forward", self)
        forward_btn.triggered.connect(self.go_forward)
        navtb.addAction(forward_btn)

        reload_btn = QAction("Reload", self)
        reload_btn.triggered.connect(self.reload_page)
        navtb.addAction(reload_btn)
        
        # Hard Reload button to fix any caching issues
        hard_reload_btn = QAction("Hard Reload", self)
        hard_reload_btn.triggered.connect(self.hard_reload_page)
        navtb.addAction(hard_reload_btn)

        self.urlbar = QLineEdit()
        self.urlbar.returnPressed.connect(self.navigate_to_url)
        navtb.addWidget(self.urlbar)
        
        add_tab_btn = QAction("+", self)
        add_tab_btn.triggered.connect(lambda: self.add_new_tab())
        navtb.addAction(add_tab_btn)

        self.add_new_tab(label="New Tab")
        self.setWindowTitle("Hindustan Browser")
        self.showMaximized()

    def get_current_browser(self):
        return self.tabs.currentWidget()

    def go_back(self):
        browser = self.get_current_browser()
        if browser: browser.back()

    def go_forward(self):
        browser = self.get_current_browser()
        if browser: browser.forward()

    def reload_page(self):
        browser = self.get_current_browser()
        if browser: browser.reload()

    def hard_reload_page(self):
        browser = self.get_current_browser()
        if browser: browser.page().action(QWebEnginePage.ReloadAndBypassCache).trigger()

    def add_new_tab(self, qurl=None, label="New Tab"):
        if qurl is None:
            qurl = QUrl(f"http://localhost:{PORT}")
        browser = QWebEngineView()
        browser.setPage(WebEnginePage(browser))
        browser.setUrl(qurl)
        i = self.tabs.addTab(browser, label)
        self.tabs.setCurrentIndex(i)
        browser.urlChanged.connect(lambda q, browser=browser: self.update_url(q) if browser == self.tabs.currentWidget() else None)
        browser.loadFinished.connect(lambda _, i=i, browser=browser: self.tabs.setTabText(i, "New Tab" if browser.url().host() == "localhost" else browser.page().title()))

    def close_current_tab(self, i):
        if self.tabs.count() < 2: return
        self.tabs.removeTab(i)

    def current_tab_changed(self, i):
        if self.tabs.currentWidget():
            qurl = self.tabs.currentWidget().url()
            self.update_url(qurl)

    def navigate_to_url(self):
        browser = self.tabs.currentWidget()
        if not browser: return
        text = self.urlbar.text()
        if '.' not in text and ' ' in text:
            q = QUrl("https://www.google.com/search?q=" + quote_plus(text))
        else:
            if "://" not in text: text = "http://" + text
            q = QUrl(text)
        browser.setUrl(q)

    def update_url(self, q):
        if q.host() == 'localhost': self.urlbar.setText("")
        else: self.urlbar.setText(q.toString())

# --- Main part of the script ---
os.environ['QTWEBENGINE_REMOTE_DEBUGGING'] = "9333"
app = QApplication(sys.argv)
QWebEngineProfile.defaultProfile().clearHttpCache()
QApplication.setApplicationName("Hindustan Browser")
window = MainWindow()
app.exec_()
