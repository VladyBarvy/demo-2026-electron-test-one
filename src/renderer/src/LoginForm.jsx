// import { useNavigate } from "react-router";

// function LoginForm() {
//   const navigate = useNavigate();

//   async function submitHandler(e) {
//     e.preventDefault()
//     const user = {
//       login: e.target.login.value,
//       password: e.target.password.value,
//     }
//     const role = await window.api.authorizeUser(user);
//     if (role === 'Администратор') {
//       navigate('/main');
//     }
//     document.querySelector('form').reset()
//   }

//   return (
//     <>
//       {/* <img alt="logo" className="logo" src={electronLogo} /> */}
//       <h1>Приветствие!</h1>
//       <h4>Введите логин и пароль, чтобы войти</h4>
//       <form onSubmit={(e) => submitHandler(e)}>
//         <label htmlFor="login">Логин:</label>
//         <input id="login" type="text" required />
//         <label htmlFor="password">Пароль:</label>
//         <input id="password" type="text" required />
//         <button type="submit">Войти</button>
//       </form>
//       <h5>Перейти на экран просмотра товаров в виде гостя</h5>
//       <button>Посмотреть товары</button>
//     </>
//   )
// }

// export default LoginForm




/////////////////////////////////////////////////////////////////////////////////////////



// 140925_1
// import { useNavigate } from "react-router";
// import "./styles/LoginForm.css"; // Импорт стилей
// import logo from "./assets/logo.png"; // Путь к логотипу

// function LoginForm() {
//   const navigate = useNavigate();

//   async function submitHandler(e) {
//     e.preventDefault()
//     const user = {
//       login: e.target.login.value,
//       password: e.target.password.value,
//     }
//     const role = await window.api.authorizeUser(user);
//     if (role === 'Администратор') {
//       navigate('/main');
//     }
//     document.querySelector('form').reset()
//   }

//   const handleGuestAccess = () => {
//     navigate('/products');
//   }

//   return (
//     <div className="login-container">
//       <div className="login-form">
//         <img alt="логотип компании" className="logo" src={logo} />
//         <h1>АВТОРИЗАЦИЯ В СИСТЕМЕ</h1>
//         <h4>Для входа в систему введите логин и пароль</h4>
        
//         <form onSubmit={submitHandler}>
//           <div>
//             <label htmlFor="login">ЛОГИН:</label>
//             <input 
//               id="login" 
//               type="text" 
//               placeholder="введите логин"
//               required 
//             />
//           </div>
          
//           <div>
//             <label htmlFor="password">ПАРОЛЬ:</label>
//             <input 
//               id="password" 
//               type="password" 
//               placeholder="введите пароль"
//               required 
//             />
//           </div>
          
//           <button type="submit">ВОЙТИ В СИСТЕМУ</button>
//         </form>
        
//         <h5>Или продолжите работу как гость</h5>
//         <button className="guest-button" onClick={handleGuestAccess}>
//           ПРОСМОТР ТОВАРОВ
//         </button>
//       </div>
//     </div>
//   )
// }

// export default LoginForm





// 140925_2
// LoginForm.jsx
// import { useNavigate } from "react-router";
// import "./styles/LoginForm.css"; // Импорт стилей
// import logo from "./assets/logo.png";

// function LoginForm({ onLogin }) {
//   const navigate = useNavigate();

//   async function submitHandler(e) {
//     e.preventDefault();
//     const userData = {
//       login: e.target.login.value,
//       password: e.target.password.value,
//     };

//     try {
//       const user = await window.api.authorizeUser(userData);
//       if (user) {
//         onLogin(user);
//         // Перенаправляем в зависимости от роли
//         switch (user.role) {
//           case 'Администратор':
//             navigate('/admin');
//             break;
//           case 'Менеджер':
//             navigate('/manager');
//             break;
//           case 'Клиент':
//             navigate('/products');
//             break;
//           default:
//             navigate('/products');
//         }
//       }
//     } catch (error) {
//       console.error('Ошибка авторизации:', error);
//     }
    
//     document.querySelector('form').reset();
//   }

//   const handleGuestAccess = () => {
//     navigate('/products');
//   };

//   return (
//     <div className="login-container">
//       <div className="login-form">
//         <img alt="логотип компании" className="logo" src={logo} />
//         <h1>АВТОРИЗАЦИЯ В СИСТЕМЕ</h1>
//         <h4>Для входа в систему введите логин и пароль</h4>
        
//         <form onSubmit={submitHandler}>
//           <div>
//             <label htmlFor="login">ЛОГИН:</label>
//             <input 
//               id="login" 
//               type="text" 
//               placeholder="введите логин"
//               required 
//             />
//           </div>
          
//           <div>
//             <label htmlFor="password">ПАРОЛЬ:</label>
//             <input 
//               id="password" 
//               type="password" 
//               placeholder="введите пароль"
//               required 
//             />
//           </div>
          
//           <button type="submit">ВОЙТИ В СИСТЕМУ</button>
//         </form>
        
//         <h5>Или продолжите работу как гость</h5>
//         <button className="guest-button" onClick={handleGuestAccess}>
//           ПРОСМОТР ТОВАРОВ
//         </button>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;















// 200925
import { useNavigate } from "react-router";
import "./styles/LoginForm.css"; // Импорт стилей
import logo from "./assets/logo.png";

function LoginForm({ setUser }) {
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault()
    const user = {
      login: e.target.login.value,
      password: e.target.password.value,
    }
    const { role, name } = await window.api.autorizeUser(user);
    console.log(role, name)
    setUser({ role, name })
    if (role === 'Администратор') {
      navigate('/main');
    }
    document.querySelector('form').reset()
  }

  return (
    <>
      <h4>Введите логин и пароль, чтобы войти</h4>
      <form onSubmit={(e) => submitHandler(e)}>
        <label htmlFor="login">Логин:</label>
        <input id="login" type="text" required />
        <label htmlFor="password">Пароль:</label>
        <input id="password" type="text" required />
        <button type="submit">Войти</button>
      </form>
      <h5>Перейти на экран просмотра товаров в виде гостя</h5>
      <button onClick={() => {
        setUser({ role: 'гость' });
        navigate('/main');
      }}>Посмотреть товары</button>
    </>
  )
}

export default LoginForm
