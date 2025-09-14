// OrderList.jsx
import { useState, useEffect } from 'react';
import './styles/OrderList.css';

function OrderList({ user, onLogout }) {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('order_date');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    filterAndSortOrders();
  }, [orders, searchTerm, sortBy, sortOrder]);

  const loadOrders = async () => {
    try {
      const ordersData = await window.api.getOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error('Ошибка загрузки заказов:', error);
    }
  };

  const filterAndSortOrders = () => {
    let filtered = orders.filter(order => {
      return order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
             order.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             order.status.toLowerCase().includes(searchTerm.toLowerCase());
    });

    filtered.sort((a, b) => {
      let valueA = a[sortBy];
      let valueB = b[sortBy];

      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    setFilteredOrders(filtered);
  };

  return (
    <div className="order-list-container">
      <div className="header">
        <h1>УПРАВЛЕНИЕ ЗАКАЗАМИ</h1>
        <div className="user-panel">
          <span>Менеджер: {user?.full_name}</span>
          <button onClick={onLogout}>Выйти</button>
        </div>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Поиск по номеру заказа, клиенту, статусу..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="order_date">По дате заказа</option>
          <option value="delivery_date">По дате доставки</option>
          <option value="order_number">По номеру заказа</option>
          <option value="status">По статусу</option>
        </select>

        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>№ Заказа</th>
              <th>Дата заказа</th>
              <th>Дата доставки</th>
              <th>Клиент</th>
              <th>Статус</th>
              <th>Пункт выдачи</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td>{order.order_number}</td>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>{order.delivery_date ? new Date(order.delivery_date).toLocaleDateString() : '-'}</td>
                <td>{order.client_name}</td>
                <td className={`status-${order.status}`}>{order.status}</td>
                <td>{order.pickup_address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList;
