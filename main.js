const path = require('path')
const glob = require('glob')
const electron = require('electron')
const autoUpdater = require('./auto-updater')

// restore window size
const windowStateKeeper = require('electron-window-state');

const BrowserWindow = electron.BrowserWindow
const app = electron.app

const debug = /--debug/.test(process.argv[2])

if (process.mas) app.setName('Habitica')

var mainWindow = null

function initialize () {
   var shouldQuit = makeSingleInstance()
   if (shouldQuit) return app.quit()

   loadDemos()

   function createWindow () {
      // Load the previous state with fallback to defaults
      let mainWindowState = windowStateKeeper({
        defaultWidth: 1080,
        defaultHeight: 840
      });

      var windowOptions = {
         'x': mainWindowState.x,
         'y': mainWindowState.y,
         'width': mainWindowState.width,
         'height': mainWindowState.height,
         title: app.getName()
      }

      mainWindow = new BrowserWindow(windowOptions)
      mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

      // Let us register listeners on the window, so we can update the state
      // automatically (the listeners will be removed when the window is closed)
      // and restore the maximized or full screen state
      mainWindowState.manage(mainWindow);

      // Launch fullscreen with DevTools open, usage: npm run debug
      if (debug) {
         mainWindow.webContents.openDevTools()
         mainWindow.maximize()
         require('devtron').install()
      }

      mainWindow.on('closed', function () {
         mainWindow = null
      })
   }

   app.on('ready', function () {
      createWindow()
      autoUpdater.initialize()
   })

   app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') {
         app.quit()
      }
   })

   app.on('activate', function () {
      if (mainWindow === null) {
         createWindow()
      }
   })
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance () {
   if (process.mas) return false

   return app.makeSingleInstance(function () {
      if (mainWindow) {
         if (mainWindow.isMinimized()) mainWindow.restore()
         mainWindow.focus()
      }
   })
}

// Require each JS file in the main-process dir
function loadDemos () {
   var files = glob.sync(path.join(__dirname, 'main-process/**/*.js'))
   files.forEach(function (file) {
      require(file)
   })
   autoUpdater.updateMenu()
}

// Handle Squirrel on Windows startup events
switch (process.argv[1]) {
   case '--squirrel-install':
   autoUpdater.createShortcut(function () { app.quit() })
   break
   case '--squirrel-uninstall':
   autoUpdater.removeShortcut(function () { app.quit() })
   break
   case '--squirrel-obsolete':
   case '--squirrel-updated':
   app.quit()
   break
   default:
   initialize()
}
