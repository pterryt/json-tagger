const { app, BrowserWindow, ipcMain } = require('electron');
const jsonFileHandler = require('./components/jsonFileHandler');
const dataAnalyzer = require('./components/dataAnalyzer');
const path = require('path');
const fs = require('fs');

const jsonHandler = new jsonFileHandler();
const analyzer = new dataAnalyzer();

const namesData = jsonHandler.readJsonFile('../unit_names.json');
const nameWords = jsonHandler.getWordCountsFromFile('src/word_counts.txt');
const nameArray = analyzer.createNpcNameArray(namesData);

let currentWordCountIndex = 0;
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.loadFile('src/index.html');
  mainWindow.webContents.openDevTools();
}

function updateView(event) {
  const filterWord = nameWords[currentWordCountIndex];
  const filteredObjects = analyzer.getAllFilteredArrays(nameArray, filterWord);
  const currentWord = filteredObjects[0].filteredArray[0]

  event.reply('json-data', { 
    filteredObjects, 
    currentWord });
}

app.whenReady().then(createWindow);

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

ipcMain.on('get-json-data', (event) => {
  updateView(event);
});

ipcMain.on('back-button-clicked', (event) => {
  if (currentWordCountIndex > 0) {
    currentWordCountIndex--;
    updateView(event);
  }
});

ipcMain.on('forward-button-clicked', (event) => {
  if (currentWordCountIndex < nameWords.length - 1) {
    currentWordCountIndex++;
    updateView(event);
  }
});

// ipcMain.on('split-button-clicked', (event, data) => {