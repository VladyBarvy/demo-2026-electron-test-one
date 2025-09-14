// AdminPanel.jsx
import { useState } from 'react';
import ProductList from './ProductList';
import OrderList from './OrderList';
//import ProductForm from './ProductForm';
//import OrderForm from './OrderForm';
import './styles/AdminPanel.css';

function AdminPanel({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>ПАНЕЛЬ АДМИНИСТРАТОРА</h1>
        <div className="admin-controls">
          <span>Администратор: {user?.full_name}</span>
          <button onClick={onLogout}>Выйти</button>
        </div>
      </div>

      <div className="admin-tabs">
        <button 
          className={activeTab === 'products' ? 'active' : ''}
          onClick={() => setActiveTab('products')}
        >
          Товары
        </button>
        <button 
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          Заказы
        </button>
        <button 
          className={activeTab === 'add-product' ? 'active' : ''}
          onClick={() => setActiveTab('add-product')}
        >
          Добавить товар
        </button>
        <button 
          className={activeTab === 'add-order' ? 'active' : ''}
          onClick={() => setActiveTab('add-order')}
        >
          Добавить заказ
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'products' && <ProductList user={user} onLogout={onLogout} />}
        {activeTab === 'orders' && <OrderList user={user} onLogout={onLogout} />}
        {activeTab === 'add-product' && <ProductForm />}
        {activeTab === 'add-order' && <OrderForm />}
      </div>
    </div>
  );
}

export default AdminPanel;
