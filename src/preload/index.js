// import { contextBridge, ipcRenderer } from 'electron'
// import { electronAPI } from '@electron-toolkit/preload'

// const api = {
//   // foo: (data) => ipcRenderer.invoke('sendSignal', data),
//   // authorizeUser: (user) => ipcRenderer.invoke('authorizeUser', user),
//   // getProducts: () => ipcRenderer.invoke('getProducts')


//   authorizeUser: (userData) => ipcRenderer.invoke('authorizeUser', userData),
//   getProducts: () => ipcRenderer.invoke('getProducts'),
//   getOrders: () => ipcRenderer.invoke('getOrders'),
//   addProduct: (productData) => ipcRenderer.invoke('addProduct', productData),
//   updateProduct: (productData) => ipcRenderer.invoke('updateProduct', productData),
//   deleteProduct: (productId) => ipcRenderer.invoke('deleteProduct', productId),
//   addOrder: (orderData) => ipcRenderer.invoke('addOrder', orderData),
//   updateOrder: (orderData) => ipcRenderer.invoke('updateOrder', orderData),
//   deleteOrder: (orderId) => ipcRenderer.invoke('deleteOrder', orderId),
// }

// if (process.contextIsolated) {
//   try {
//     contextBridge.exposeInMainWorld('electron', electronAPI)
//     contextBridge.exposeInMainWorld('api', api)
//   } catch (error) {
//     console.error(error)
//   }
// } else {
//   window.electron = electronAPI
//   window.api = api
// }




const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  authorizeUser: (userData) => ipcRenderer.invoke('authorizeUser', userData),
  getProducts: () => ipcRenderer.invoke('getProducts'),
  getOrders: () => ipcRenderer.invoke('getOrders'),
  
  // Добавим отладочные функции
  ping: () => ipcRenderer.invoke('ping'),
});
