const { app, BrowserWindow, Menu } = require('electron'); // npm i electron
const express = require('express'); // npm i express
const server = express();
const path = require('path');
const PORT = 3030; // Puerto donde se ejecutará el servidor

// Configura el servidor web local
server.use(express.static(path.join(__dirname, 'proyect')));

// Eliminar el menú por defecto
Menu.setApplicationMenu(null);

// Crea una ventana de navegador Electron
app.on('ready', () => {
    const mainWindow = new BrowserWindow({ width: 800, height: 600 });
    mainWindow.loadURL(`http://localhost:${PORT}`);
    // mainWindow.webContents.openDevTools()
});

// Inicia el servidor
server.listen(PORT, () => {
    console.log(`Local server port on http://localhost:${PORT}`);
});