const TabGroup = require("electron-tabs")
const { ipcRenderer, TouchBarSegmentedControl } = require("electron")
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

function handleTabClick(clusterId) {
    const alreadyOpened = tabs.getTabs()
        .some(x => x.getTitle().includes(clusterId))

    if (alreadyOpened) {
        console.log("[Renderer] Studio is already opened", clusterId)
        return
    }

    createTab(clusterId)
}

const clusters = ["C01", "C02", "C03"]

Array.from(document.getElementsByTagName("a"))
    .forEach(tag => {
        tag.addEventListener("click", ({ target }) => {
            const clusterId = target.attributes["tag-id"].value
            handleTabClick(clusterId)
        })
    })

clusters.forEach(cluster => {
    createTab(cluster)
})