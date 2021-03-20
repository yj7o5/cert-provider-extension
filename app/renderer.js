const TabGroup = require("electron-tabs")
const { ipcRenderer } = require("electron")
const tabs = new TabGroup()

function createTab(cluster) {
    const tab = tabs.addTab({
        title: `Raven Studio - ${cluster}`,
        src: "https://localhost:5001/studio/index.html",
        webviewAttributes: {
            partition: cluster
        }
    })

    ipcRenderer.invoke("open-raven-studio", cluster)
        .then(() => {
            tab.activate()
            tab.show()
        })
}

const clusters = ["C01", "C02"]

clusters.forEach(cluster => {
    createTab(cluster)
})