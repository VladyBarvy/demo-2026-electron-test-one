import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import connectDB from './db';

async function authorize(event, user) {
  const { login, password } = user;

  try {
    const response = await global.dbclient.query(`SELECT LOGIN, FULLNAME, PASSWORD, ROLE FROM EMPLOYEES`);
    const user = response.rows.find((user) => user.login === login && user.password === password);
    if (user) {
      return { role: user.role, name: user.fullname };
    } dialog.showErrorBox('Такого пользователя нет', 'Попробуйте ввести другой логин и/или пароль')
  } catch (e) {
    return ('error')
  }
}
async function getGoods(event) {
  try {
    const response = await global.dbclient.query(`SELECT * from goods`);
    return response.rows;
  } catch (e) {
    return ('error')
  }
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron')

  global.dbclient = await connectDB();

  ipcMain.handle('authorizeUser', authorize)
  ipcMain.handle('getGoods', getGoods)

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})










































// import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
// import { join } from 'path'
// import { electronApp, optimizer, is } from '@electron-toolkit/utils'
// import icon from '../../resources/icon.png?asset'

// import connectDB from './db';






// async function authorize(event, user) {
//   const { login, password } = user;

//   try {
//     const response = await global.dbclient.query(`SELECT LOGIN, PASSWORD, ROLE FROM USERS`);
//     const user = response.rows.find((user) => user.login === login && user.password === password);
//     if (user) {
//       return user.role;
//     } dialog.showErrorBox('Такого пользователя нет', 'Попробуйте ввести другой логин и/или пароль')
//   } catch (e) {
//     return ('error')
//   }
// }


// async function getProducts() {
//   try {
//     console.log('Получение товаров из базы данных...');
    
//     // Проверяем, что dbclient существует и имеет метод query
//     if (!global.dbclient || typeof global.dbclient.query !== 'function') {
//       console.error('dbclient не инициализирован или не имеет метода query');
//       return [];
//     }
    
//     // Используем правильный синтаксис для pg-mem
//     const response = await global.dbclient.public.many('SELECT * FROM goods ORDER BY name');
//     console.log('Товары получены:', response.length, 'шт.');
//     return response;
//   } catch (e) {
//     console.error('Ошибка получения товаров:', e);
//     return [];
//   }
// }

// // Аналогично исправьте getOrders
// async function getOrders() {
//   try {
//     if (!global.dbclient || typeof global.dbclient.query !== 'function') {
//       console.error('dbclient не инициализирован');
//       return [];
//     }
    
//     const response = await global.dbclient.public.many(`
//       SELECT o.*, pp.address as pickup_address 
//       FROM orders o 
//       LEFT JOIN pickup_points pp ON o.pickup_address_id = pp.id 
//       ORDER BY o.order_date DESC
//     `);
//     return response;
//   } catch (e) {
//     console.error('Ошибка получения заказов:', e);
//     return [];
//   }
// }

// // Исправленная функция authorizeUser
// async function authorizeUser(event, userData) {
//   try {
//     if (!global.dbclient || typeof global.dbclient.query !== 'function') {
//       console.error('dbclient не инициализирован для авторизации');
//       return null;
//     }
    
//     const response = await global.dbclient.public.many(`
//       SELECT id, role, full_name, login FROM users 
//       WHERE login = $1 AND password = $2
//     `, [userData.login, userData.password]);
    
//     if (response.length > 0) {
//       return response[0];
//     } else {
//       const { dialog } = require('electron');
//       dialog.showErrorBox('Ошибка', 'Неверный логин или пароль');
//       return null;
//     }
//   } catch (e) {
//     console.error('Ошибка авторизации:', e);
//     return null;
//   }
// }


// async function foo(event, data) {
//   try {
//     console.log(data)
//     dialog.showMessageBox({ message: 'message back' })
//   } catch (e) {
//     dialog.showErrorBox('Ошибка', e)
//   }
// }

// function createWindow() {
//   const mainWindow = new BrowserWindow({
//     width: 900,
//     height: 670,
//     show: false,
//     autoHideMenuBar: true,
//     ...(process.platform === 'linux' ? { icon } : {}),
//     webPreferences: {
//       preload: join(__dirname, '../preload/index.js'),
//       sandbox: false
//     }
//   })

//   mainWindow.on('ready-to-show', () => {
//     mainWindow.show()
//   })

//   mainWindow.webContents.setWindowOpenHandler((details) => {
//     shell.openExternal(details.url)
//     return { action: 'deny' }
//   })

//   if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
//     mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
//   } else {
//     mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
//   }
// }

// app.whenReady().then(async () => {
//   electronApp.setAppUserModelId('com.electron')


//   try {
//     // Сохраняем всю базу данных, а не клиент
//     global.db = await connectDB();
//     console.log('База данных инициализирована');
//   } catch (error) {
//     console.error('Ошибка инициализации базы данных:', error);
//   }


//  // global.dbclient = await connectDB();



//    // Регистрируем обработчики
//    ipcMain.handle('authorizeUser', authorizeUser);
//    ipcMain.handle('getProducts', getProducts);
//    ipcMain.handle('getOrders', getOrders);


//   ipcMain.handle('sendSignal', foo),


//   app.on('browser-window-created', (_, window) => {
//     optimizer.watchWindowShortcuts(window)
//   })

//   createWindow()

//   app.on('activate', function () {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
//   })
// })

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
// import { join } from 'path'
// import { electronApp, optimizer, is } from '@electron-toolkit/utils'
// import { initDatabase, dbAPI } from './db'

// let db = null;

// function createWindow() {
//   const mainWindow = new BrowserWindow({
//     width: 900,
//     height: 670,
//     show: false,
//     autoHideMenuBar: true,
//     webPreferences: {
//       preload: join(__dirname, '../preload/index.js'),
//       sandbox: false,
//       nodeIntegration: false,
//       contextIsolation: true
//     }
//   })

//   mainWindow.on('ready-to-show', () => {
//     mainWindow.show()
//   })

//   mainWindow.webContents.setWindowOpenHandler((details) => {
//     shell.openExternal(details.url)
//     return { action: 'deny' }
//   })

//   if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
//     mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
//   } else {
//     mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
//   }
// }

// // Обработчики IPC
// async function handleGetProducts() {
//   try {
//     console.log('Получение товаров из базы данных...');
//     if (!db) {
//       throw new Error('База данных не инициализирована');
//     }
    
//     const products = dbAPI.getProducts(db);
//     console.log('Товары получены:', products.length, 'шт.');
//     return products;
//   } catch (error) {
//     console.error('Ошибка получения товаров:', error);
//     return [];
//   }
// }

// async function handleGetOrders() {
//   try {
//     if (!db) {
//       throw new Error('База данных не инициализирована');
//     }
    
//     return dbAPI.getOrders(db);
//   } catch (error) {
//     console.error('Ошибка получения заказов:', error);
//     return [];
//   }
// }

// async function handleAuthorizeUser(event, userData) {
//   try {
//     if (!db) {
//       throw new Error('База данных не инициализирована');
//     }
    
//     const user = dbAPI.authorizeUser(db, userData.login, userData.password);
    
//     if (user) {
//       return user;
//     } else {
//       dialog.showErrorBox('Ошибка авторизации', 'Неверный логин или пароль');
//       return null;
//     }
//   } catch (error) {
//     console.error('Ошибка авторизации:', error);
//     dialog.showErrorBox('Ошибка', 'Произошла ошибка при авторизации');
//     return null;
//   }
// }

// app.whenReady().then(() => {
//   electronApp.setAppUserModelId('com.electron')

//   // Инициализируем базу данных
//   try {
//     db = initDatabase();
//     console.log('База данных успешно инициализирована');
//   } catch (error) {
//     console.error('Ошибка инициализации базы данных:', error);
//     dialog.showErrorBox('Ошибка', 'Не удалось инициализировать базу данных');
//   }

//   // Регистрируем обработчики IPC
//   ipcMain.handle('getProducts', handleGetProducts);
//   ipcMain.handle('getOrders', handleGetOrders);
//   ipcMain.handle('authorizeUser', handleAuthorizeUser);



//   ipcMain.handle('ping', () => {
//     return 'pong';
//   });
  

//   app.on('browser-window-created', (_, window) => {
//     optimizer.watchWindowShortcuts(window)
//   })

//   createWindow()

//   app.on('activate', function () {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
//   })
// })

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })
