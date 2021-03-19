const { app, BrowserWindow } = require('electron')

function createWindow(url, cluster) {
    const win = new BrowserWindow({
        width: 600,
        height: 800,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: false,
            partition: cluster
        }
    })

    console.log("setting up", url, cluster)

    win.loadURL(url, {
        extraHeaders: `cluster:${cluster}`
    })

    win.once("ready-to-show", () => {
        win.show()
    })

    win.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
        console.log("requesting from", cluster)
        details.requestHeaders["cluster"] = cluster
        callback({ cancel: false, requestHeaders: details.requestHeaders })
    })
}

app.whenReady().then(() => {

    var url = "https://localhost:5001/studio/index.html"

    createWindow(url, "C01")
    createWindow(url, "C02")

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
