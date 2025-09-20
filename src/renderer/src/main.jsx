// import './assets/main.css'

// import { StrictMode } from 'react'
// import { Routes, Route, HashRouter } from 'react-router'
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import LoginForm from './LoginForm'
// import ProductList from './ProductList';
// import OrderList from './OrderList';
// import AdminPanel from './AdminPanel';
// import ManagerPanel from './ManagerPanel';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <HashRouter>
//     <StrictMode>
//       <Routes>
//         {/* <Route path='/' element={<LoginForm/>}/>
//         <Route path='/' element={<App/>}/>
//         <Route path="/products" element={<ProductList />} /> */}



//         <Route
//           path="/"
//           element={<LoginForm onLogin={handleLogin} />}
//         />
//         <Route
//           path="/products"
//           element={
//             <ProductList
//               user={user}
//               onLogout={handleLogout}
//               showFilters={!!user} // Гостю без фильтров
//             />
//           }
//         />
//         <Route
//           path="/orders"
//           element={
//             <OrderList
//               user={user}
//               onLogout={handleLogout}
//             />
//           }
//         />
//         <Route
//           path="/admin"
//           element={
//             <AdminPanel
//               user={user}
//               onLogout={handleLogout}
//             />
//           }
//         />
//         <Route
//           path="/manager"
//           element={
//             <ManagerPanel
//               user={user}
//               onLogout={handleLogout}
//             />
//           }
//         />




//       </Routes>
//     </StrictMode>
//   </HashRouter>
// )
























// import './assets/main.css'
// import { StrictMode } from 'react'
// import { Routes, Route, HashRouter } from 'react-router'
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   // <StrictMode>
//     <HashRouter>
//       <App />
//     </HashRouter>
//   // </StrictMode>
// )











import './assets/main.css'

import { StrictMode, createContext, useContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import LoginForm from './LoginForm'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>
)
