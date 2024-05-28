const ini = require('ini');
const fs = require('fs');

const userIniPath = 'user.ini';


class UserSettings {
  constructor() {
    this.userSettings = this.readUserSettings();
  }

  readUserSettings() {
    let userSettings = {};
    try {
      userSettings = ini.parse(fs.readFileSync(userIniPath, 'utf-8'));
    } catch (error) {
      console.error('Error reading user settings:', error);
    }
    return userSettings;
  }

  getUserSettings() {
    return this.userSettings;
  }

  saveUserSettings(settings) {
    try {
      fs.writeFileSync(userIniPath, ini.stringify(settings));
    } catch (error) {
      console.error('Error saving user settings:', error);
    }
  }
}

module.exports = UserSettings;