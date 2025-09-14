// ManagerPanel.jsx
import { useState } from 'react';
import ProductList from './ProductList';
import OrderList from './OrderList';
import './styles/ManagerPanel.css';

function ManagerPanel({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div className="manager-panel">
      <div className="manager-header">
        <h1>ПАНЕЛЬ МЕНЕДЖЕРА</h1>
        <div className="manager-controls">
          <span>Менеджер: {user?.full_name}</span>
          <button onClick={onLogout}>Выйти</button>
        </div>
      </div>

      <div className="manager-tabs">
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
      </div>

      <div className="manager-content">
        {activeTab === 'products' && <ProductList user={user} onLogout={onLogout} />}
        {activeTab === 'orders' && <OrderList user={user} onLogout={onLogout} />}
      </div>
    </div>
  );
}

export default ManagerPanel;
