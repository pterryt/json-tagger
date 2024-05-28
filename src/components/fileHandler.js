const fs = require('fs');
const path = require('path');

class FileHandler {
  // Read a JSON file and return the data
  readJsonFile(filePath) {
    const absolutePath = path.resolve(__dirname, filePath);
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(fileContent);
  }

  // Take data, convert it to JSON, and save it to a file
  writeJsonFile(filePath, data) {
    const absolutePath = path.resolve(__dirname, filePath);
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(absolutePath, jsonData, 'utf-8');
  }

  getWordCountsFromFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return fileContent.split('\r\n');
  }

  loadNamesJson(filePathNoExt) {
    const jsonData = this.readJsonFile(filePathNoExt + '.json');
    this.writeJsonFile(filePathNoExt + '.bak', jsonData);
    return jsonData;
  }  
}

module.exports = FileHandler;