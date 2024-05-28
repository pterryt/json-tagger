const { app, BrowserWindow, ipcMain } = require('electron');
const FileHandler = require('./components/fileHandler');
const dataAnalyzer = require('./components/dataHandler');
const UserSettings = require('./components/userSettings');

const userSettings = new UserSettings();
const settings = userSettings.getUserSettings();

const fileHandler = new FileHandler();
const analyzer = new dataAnalyzer();

let namesData = fileHandler.loadNamesJson('../data/name_table');
let nameWords = fileHandler.getWordCountsFromFile('src/data/word_counts.txt');

let currentWordCountIndex = settings.LastSeenIndex || 0;
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
  const filterWord = nameWords[currentWordCountIndex].trim();
  // console.log('filterWord @main.updateView:', filterWord);
  const filteredObjects = analyzer.getNameFilteredData(namesData, filterWord);
  event.reply('json-data', filteredObjects);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    settings.LastSeenIndex = currentWordCountIndex;
    userSettings.saveUserSettings(settings);
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

ipcMain.on('split-button-clicked', (event, splitArrayObject) => {
  namesData = analyzer.splitUpdateData(namesData, splitArrayObject.selectedText);
  nameWords.splice(currentWordCountIndex, 0, splitArrayObject.selectedText);
  updateView(event);
});