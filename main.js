const { app, BrowserWindow } = require('electron');
const path = require('path');
const WindowUtil = require('./app/class/WindowUtil');


app.whenReady().
    then(() => {
        WindowUtil.createHomeView();
    });

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        WindowUtil.createHomeView();
    }
});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
