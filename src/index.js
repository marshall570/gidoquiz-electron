const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express')
const { errors } = require('celebrate')
const routes = require('./routes')

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });


  const server = express()

  server.use(errors())
  server.use(express.json())
  server.use(routes)
  server.listen(3333)

  mainWindow.loadURL('http://localhost:3333')
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // mainWindow.webContents.openDevTools();
  // mainWindow.menuBarVisible(false)
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
