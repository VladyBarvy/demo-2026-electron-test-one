import LoginForm from "./LoginForm"
import Store from "./Store"
import { useState } from "react"
import { Routes, Route, HashRouter } from 'react-router'

function App() {

  const [user, setUser] = useState({ role: 'не авторизован', name: null })
  return (
    <>
      {user.name ? <h1>{`${user.name} Роль: ${user.role}`}</h1> : <h1>Гость</h1>}
      <HashRouter>
        <Routes>
          <Route path='/' element={<LoginForm setUser={setUser} />} />
          <Route path='/main' element={<Store user={user} setUser={setUser} />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App


























// import { useEffect } from 'react'
// import electronLogo from './assets/electron.svg'

// function App() {
//   useEffect(() => {
//     (async (data="test") => await window.api.foo(data))()
//   }, [])


//   return (
//     <>
//       <img alt="logo" className="logo" src={electronLogo} />
//       <h1>Hello, world!</h1>
//     </>
//   )
// }

// export default App









// import { Routes, Route } from 'react-router-dom'
// import { useState } from 'react'
// import LoginForm from './LoginForm'
// import ProductList from './ProductList'
// import OrderList from './OrderList'
// import AdminPanel from './AdminPanel'
// import ManagerPanel from './ManagerPanel'

// function App() {
//   const [user, setUser] = useState(null)

//   const handleLogin = (userData) => {
//     setUser(userData)
//   }

//   const handleLogout = () => {
//     setUser(null)
//   }

//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={<LoginForm onLogin={handleLogin} />}
//       />
//       <Route
//         path="/products"
//         element={
//           <ProductList
//             user={user}
//             onLogout={handleLogout}
//             showFilters={!!user}
//           />
//         }
//       />
//       <Route
//         path="/orders"
//         element={
//           <OrderList
//             user={user}
//             onLogout={handleLogout}
//           />
//         }
//       />
//       <Route
//         path="/admin"
//         element={
//           <AdminPanel
//             user={user}
//             onLogout={handleLogout}
//           />
//         }
//       />
//       <Route
//         path="/manager"
//         element={
//           <ManagerPanel
//             user={user}
//             onLogout={handleLogout}
//           />
//         }
//       />
//     </Routes>
//   )
// }

// export default App
