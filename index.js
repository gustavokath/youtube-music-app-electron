'use strict';
const electron = require("electron");
const fs = require('fs');
const path = require('path');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ titleBarStyle: 'hidden' });
  mainWindow.loadURL('https://music.youtube.com');

  mainWindow.on("closed", () => (mainWindow = null));

  return mainWindow
}

app.on("ready", () => {
  mainWindow = createWindow();
  const page = mainWindow.webContents;

  page.on('dom-ready', () => {
    page.insertCSS(fs.readFileSync(path.join(__dirname, 'browser.css'), 'utf8'));
    mainWindow.show();
  });

  page.on('new-window', function (event, url) {
    event.preventDefault()
    shell.openExternal(url)
  });


});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});