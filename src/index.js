const { app, BrowserWindow } = require('electron')
const path = require('path')
require('dotenv/config')

if (require('electron-squirrel-startup')) {
  app.quit()
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 600,
    icon: path.join(__dirname, '/assets/icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  mainWindow.loadURL('https://gidoquiz-backend.herokuapp.com/')
  mainWindow.loadFile(path.join(__dirname, '/pages/main_menu/index.html'))
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
