const path = require('path')
const {ipcMain, app, Menu, Tray} = require('electron')

let appIcon = null

ipcMain.on('put-in-tray', (event) => {
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
  const iconPath = path.join(__dirname, iconName)
  const balloonContent = {
    title: '标题测试',
    content: 'content',
    icon: iconPath
  }

  appIcon = new Tray(iconPath)

  const contextMenu = Menu.buildFromTemplate([{
    label: 'Remove',
    click: () => {
      event.sender.send('tray-removed')
    }
  }])

  appIcon.setToolTip('Electron Demo in the tray.')
  appIcon.setContextMenu(contextMenu)
  appIcon.displayBalloon(balloonContent)
})

ipcMain.on('remove-tray', () => {
  appIcon.destroy()
})

app.on('window-all-closed', () => {
  if (appIcon) appIcon.destroy()
})
