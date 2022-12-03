
const { BrowserWindow, app, ipcMain, dialog, Menu } = require('electron');
const { execSync } = require("child_process");
const process = require("process");
const path = require('path');

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 400,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: __dirname + '/icon.png'
  })

  win.loadFile('index.html');
  win.setTitle("Electron React Menu")

  ipcMain.on('select-dirs', async (event, arg) => {
    const result = await dialog.showOpenDialog(win, {
      properties: ['openDirectory']
    })
    console.log('directories selected', result.filePaths)
    win.webContents.send('directory_choosen', result.filePaths)
  })
  
  const template = [
    {
      label: "File",
      submenu: [
      {
        label: "Home",
        click: function(){
          console.log("Clicked Home")
          win.webContents.send('content_home', "")
        }
      },
      {
        type: "separator"
      },
      {
        label: "Exit",
        click: function(){
          app.quit();
        }
      }
      ]
    },
    {
      label: "Option",
      click: function(){
        console.log("Clicked Option")
        win.webContents.send('content_option', "")
      }
    }
    
    ]
    
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    //win.webContents.openDevTools()

}

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  })
}


app.whenReady().then(createWindow)
