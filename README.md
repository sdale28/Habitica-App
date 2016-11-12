# Habitica

[Habitica] is a great tool for staying productive and working toward your goals. This is a simple Mac client for Habitica so that you can open Habitica in a separate window and __keep Chrome closed__. You still need an internet connection to use Habitica in this app, but Chrome can stay closed and Facebook/Twitter/Youtube/Instagram can be kept behind the "Gates of Distraction".

To run code you need [Electron] and [Node.js] installed. Then, download zip or clone the repo (make sure to unzip directory). In Terminal:
```
~ Downloads $ cd Habitica-App
~ Habitica-App $ npm install --save electron-window-state
~ Habitica-App $ npm run package
```

In case you're wondering, ```npm install --save electron-window-state``` enables the window size to be restored as explained on the [Electron Window State] repo.
This: ```npm run package``` packages the app which can then be used like a normal app. It's found in ```/Habitica-App/out```

*Note: I do not claim Habitica as my own. This application is built off of [Electron], a free and open source tool created by GitHub. Specifically, this project was based largely off of the [Electron API Demos] application. My application simply displays Habitica's site (a free and open source project) as a separate application (by taking advantage of webview).*

[Habitica]: <https://habitica.com/>
[Electron]: <http://electron.atom.io/>
[Electron API Demos]: <https://github.com/electron/electron-api-demos>
[Electron Window State]: <https://github.com/mawie81/electron-window-state>
[Node.js]: <https://nodejs.org/en/>
