const { 
    app, 
    BrowserWindow, 
    session,
    ipcMain
} = require('electron')

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        width: 1440,
        height: 900,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            webviewTag: true,
            contextIsolation: false
        }
    })

    mainWindow.loadFile("./index.html")

    mainWindow.once("ready-to-show", () => {
        mainWindow.show()
    })
}

ipcMain.handle("open-raven-studio", (event, arg) => {
    console.log("[Main] received event", arg)

    session.fromPartition(arg).webRequest.onBeforeSendHeaders((details, callback) => {
        details.requestHeaders["cluster"] = arg
        callback({ cancel: false, requestHeaders: details.requestHeaders })
    })
})

app.whenReady().then(() => {

    createMainWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
