
const { ipcRenderer, contextBridge } = require('electron');

const qr_home = new BroadcastChannel("home");
const qr_option = new BroadcastChannel("option");
const qr_choosen = new BroadcastChannel("directory_choosen");

ipcRenderer.on('content_home', function (event,store) {
  qr_home.postMessage("");
});

ipcRenderer.on('content_option', function (event,store) {
  qr_option.postMessage("");
});

ipcRenderer.on('directory_choosen', function (event,data) {
  qr_choosen.postMessage(JSON.stringify({ path: data }));
});

contextBridge.exposeInMainWorld('electron', {
  directoryApi: {
    openDirectory() {
      ipcRenderer.send('select-dirs', "");
    }
  },
  batteryApi: {

  },
  filesApi: {

  }
  
})
