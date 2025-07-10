import {app,BrowserWindow, Menu,} from "electron"

function createWindow(){
    const win = new BrowserWindow({
        roundedCorners:true,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false
        },
        width:900,
        height:600,
        minWidth:450,
        minHeight:300,
        hasShadow:true,
    });
    Menu.setApplicationMenu(null);
    win.loadURL("http://localhost:5173")
}
app.whenReady().then(createWindow);