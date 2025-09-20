import { Client } from 'pg';

export default async () => {
  const client = new Client({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: '5432',
    database: 'testdb',
  });

  await client.connect();
  return client;
};






// // 140925_3
// import { newDb } from 'pg-mem';

// // Создаем и настраиваем базу данных
// export const initDatabase = () => {
//   const db = newDb();

//   // Создаем таблицы
//   db.public.none(`
//     CREATE TABLE pickup_points (
//       id SERIAL PRIMARY KEY,
//       address TEXT NOT NULL UNIQUE
//     );
//   `);

//   db.public.none(`
//     CREATE TABLE users (
//       id SERIAL PRIMARY KEY,
//       role VARCHAR(50) NOT NULL,
//       full_name VARCHAR(200) NOT NULL UNIQUE,
//       login VARCHAR(100) NOT NULL,
//       password VARCHAR(100) NOT NULL
//     );
//   `);

//   db.public.none(`
//     CREATE TABLE orders (
//       id SERIAL PRIMARY KEY,
//       order_number VARCHAR(100) NOT NULL,
//       article VARCHAR(100) NOT NULL,
//       order_date DATE NOT NULL,
//       delivery_date DATE,
//       pickup_address_id INTEGER REFERENCES pickup_points(id),
//       client_id INTEGER REFERENCES users(id),
//       client_name VARCHAR(200),
//       pickup_code VARCHAR(50),
//       status VARCHAR(50) DEFAULT 'новый'
//     );
//   `);

//   db.public.none(`
//     CREATE TABLE goods (
//       id SERIAL PRIMARY KEY,
//       article VARCHAR(100) NOT NULL UNIQUE,
//       name VARCHAR(200) NOT NULL,
//       unit VARCHAR(50) DEFAULT 'шт.',
//       price NUMERIC NOT NULL,
//       supplier VARCHAR(200),
//       manufacturer VARCHAR(200),
//       category VARCHAR(100),
//       discount NUMERIC DEFAULT 0,
//       stock_quantity INTEGER DEFAULT 0,
//       description TEXT,
//       photo_url TEXT
//     );
//   `);

//   // Добавляем тестовые данные
//   addTestData(db);

//   return db;
// };

// // Функция для добавления тестовых данных
// const addTestData = (db) => {
//   try {
//     // Пользователи
//     db.public.none(`
//       INSERT INTO users (role, full_name, login, password) VALUES
//       ('Администратор', 'Иванов Иван Иванович', 'admin', 'admin123'),
//       ('Менеджер', 'Петров Петр Петрович', 'manager', 'manager123'),
//       ('Клиент', 'Сидоров Алексей Владимирович', 'client', 'client123')
//     `);

//     // Пункты выдачи
//     db.public.none(`
//       INSERT INTO pickup_points (address) VALUES
//       ('ул. Ленина, д. 10'),
//       ('пр. Мира, д. 25'),
//       ('ул. Центральная, д. 5')
//     `);

//     // Товары
//     db.public.none(`
//       INSERT INTO goods (article, name, unit, price, supplier, manufacturer, category, discount, stock_quantity, description, photo_url) VALUES
//       ('SH001', 'Кроссовки спортивные', 'шт.', 4999, 'ООО СпортТовары', 'Nike', 'Обувь', 10, 25, 'Удобные кроссовки для бега и занятий спортом', ''),
//       ('SH002', 'Туфли классические', 'шт.', 3599, 'ЗАО МоднаяОбувь', 'ECCO', 'Обувь', 5, 15, 'Элегантные туфли для офиса и торжественных мероприятий', ''),
//       ('SH003', 'Сапоги зимние', 'шт.', 6999, 'ИП ЗимняяОбувь', 'Columbia', 'Обувь', 20, 8, 'Теплые зимние сапоги с мехом', ''),
//       ('SH004', 'Ботинки рабочие', 'шт.', 2999, 'ООО ПрофОбувь', 'Timberland', 'Обувь', 0, 30, 'Прочные ботинки для работы и активного отдыха', ''),
//       ('SH005', 'Тапочки домашние', 'шт.', 999, 'ИП УютныйДом', 'HomeWear', 'Обувь', 0, 50, 'Мягкие и удобные домашние тапочки', '')
//     `);

//     // Заказы
//     db.public.none(`
//       INSERT INTO orders (order_number, article, order_date, delivery_date, pickup_address_id, client_id, client_name, pickup_code, status) VALUES
//       ('ORD001', 'SH001', '2024-01-15', '2024-01-20', 1, 3, 'Сидоров Алексей Владимирович', 'A123', 'доставлен'),
//       ('ORD002', 'SH003', '2024-01-16', '2024-01-22', 2, 3, 'Сидоров Алексей Владимирович', 'B456', 'в обработке'),
//       ('ORD003', 'SH002', '2024-01-17', NULL, 3, 3, 'Сидоров Алексей Владимирович', 'C789', 'новый')
//     `);

//     console.log('Тестовые данные добавлены в базу');
//   } catch (error) {
//     console.error('Ошибка при добавлении тестовых данных:', error);
//   }
// };

// // Функции для работы с данными
// export const dbAPI = {
//   getProducts: (db) => {
//     try {
//       return db.public.many('SELECT * FROM goods ORDER BY name');
//     } catch (error) {
//       console.error('Ошибка получения товаров:', error);
//       return [];
//     }
//   },

//   getOrders: (db) => {
//     try {
//       return db.public.many(`
//         SELECT o.*, pp.address as pickup_address 
//         FROM orders o 
//         LEFT JOIN pickup_points pp ON o.pickup_address_id = pp.id 
//         ORDER BY o.order_date DESC
//       `);
//     } catch (error) {
//       console.error('Ошибка получения заказов:', error);
//       return [];
//     }
//   },

//   authorizeUser: (db, login, password) => {
//     try {
//       const users = db.public.many(
//         'SELECT id, role, full_name, login FROM users WHERE login = $1 AND password = $2',
//         [login, password]
//       );
//       return users.length > 0 ? users[0] : null;
//     } catch (error) {
//       console.error('Ошибка авторизации:', error);
//       return null;
//     }
//   }
// };
