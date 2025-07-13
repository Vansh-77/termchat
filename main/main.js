import { app, BrowserWindow, Menu, } from "electron"

function createWindow() {
    const win = new BrowserWindow({
        roundedCorners: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        width: 1200,
        height: 700,
        minWidth: 450,
        minHeight: 300,
        hasShadow: true,
    });
    win.webContents.on('did-finish-load', () => {
        win.webContents.insertCSS(`
    ::-webkit-scrollbar {
      display: none;
    }
    body {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
  `);
    });
    Menu.setApplicationMenu(null);
    win.loadURL("http://localhost:5173")
}

app.whenReady().then(createWindow);