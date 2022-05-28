let { app, BrowserWindow,Menu,Tray ,nativeImage,Notification } = require('electron')
let path = require ('path')
///lấy menu bên mymenu.js khai báo 
let _menu = require('./mymenu')
// khai báo ffmpeg
// const ffmpeg = require('fluent-ffmpeg')
let mainWindow , thongbaohethong
let size = 20
let newimg = nativeImage.createFromPath(path.join(__dirname,'image/new.jpg')).resize({width: size,  height: size})
let imgsave = nativeImage.createFromPath(path.join(__dirname,'image/save.jpg')).resize({width: size,height: size})
let imageexit = nativeImage.createFromPath(path.join(__dirname,'image/exit.jpg')).resize({width: size, height: size})
function createWindow() {
  mainWindow = new BrowserWindow({
    icon: 's_music.jpg',
    width: 550,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    resizable: true
  })
mainWindow.loadFile('index.html')
let  ctxMenu =Menu.buildFromTemplate(_menu)//lấy thanh menu bên mymenu luôn
//let  ctxMenu =Menu.buildFromTemplate(_menu[0].submenu)
//////khung ngữ cảnh menu khi kích chuột phải 
mainWindow.webContents.on('context-menu', (mainWindow, chuot) => {
    ctxMenu.popup(mainWindow, chuot.x, chuot.y)
})
var menuMain = Menu.buildFromTemplate([{
  label: 'Menu App',
  submenu: [{
      label: 'thêm bài hát ',
      accelerator: 'ctrl+N',
      click: _ => {
        createAddWindow()
      },
      icon: newimg
    },
    {
      type: 'separator'
    },
    {
      label: 'Lưu Bài Hát ',
      accelerator: 'ctrl+S',
      icon: imgsave,
      click: () => {
        mainWindow.webContents.send('Save_baihat')
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'đóng ứng dụng ',
      accelerator: 'ctrl+Q',
      click() {
        app.exit()
      },
      icon: imageexit
    },
    {
      type: 'separator'
    },
    {
      label: 'show/Hide ứng dụng ',
      type: 'radio',
      click: () => {
        if (mainWindow.isVisible()) {
          thongbao()
          mainWindow.hide()
        } else {
          mainWindow.show()
        }
      }
    }
  ]
},
{
  type: 'separator'
},
{
  label: '&nhấp chuột phải xem tùy chọn khác',
}])
//icon dưới thanh 
thongbaohethong = new Tray(path.join(__dirname, 'image/admin.jpg'))
thongbaohethong.setToolTip('Lập Trình Viên Lê Văn')
////menu 
///// thongbaohethong.setContextMenu(Menu.buildFromTemplate(_menu))
mainWindow.on('minimize', () => {
  thongbao()
  mainWindow.hide()
})
// khi nhap chuot 2 lan no se show len 
thongbaohethong.addListener('double-click', () => {
  if (!mainWindow.isVisible()) {
    mainWindow.show()
  }
})
//////
mainWindow.setMenu(menuMain)
}
app.on('ready', createWindow)

function thongbao() {
  var tb = {
    title: 'thông báo ',
    body: ' cửa sổ ứng dụng đã đc thu nhỏ hệ thống|dbclick để mở lại  ',
    icon: 'image/admin.jpg'
  }
  new Notification(tb).show()
}
/////////////
function createAddWindow() {
  var addWin = new BrowserWindow({
    // vieets cho app con 
    icon: 's_music.jpg',
    width: 400,
    height: 350,
    parent: mainWindow,
    webPreferences: { //chích thuốc qua html mới requi electron
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  var menuAdd = Menu.buildFromTemplate([{
    label: 'quay lại ',
    click() {
      addWin.close()
    }
  }])
  addWin.setMenu(menuAdd)
  addWin.loadFile('./html/addwin.html')
  // mainwin.webContents.openDevTools()  //ctrl shifft + i hiển thị ra consolog
}
app.setAppUserModelId(process.execPath)
// app.on('ready',()=>{thongbao()
// })
/////
function thongbao2() {
  var tb = {
    icon: 's_music.jpg',
    title: 'Chú ý !',
    body: ' Bạn đang sử dụng ứng dụng nghe nhạc trên máy tính '
  }
  new Notification(tb).show()
}
app.setAppUserModelId(process.execPath)
app.on('ready', () => {
  thongbao2()
})