// import { Client } from 'pg';

// export default async () => {
//   const client = new Client({
//     user: 'postgres',
//     password: 'postgres',
//     host: 'localhost',
//     port: '5432',
//     database: 'demo_2025',
//   });

//   await client.connect();
//   return client;
// };









// import { newDb } from 'pg-mem';


// import { readFileSync } from 'fs';
// import * as XLSX from 'xlsx';
// import csv from 'csv-parser';
// import { Transform } from 'stream'; // Для обработки CSV

// export default async () => {
//   const db = newDb();
//   const client = db.adapters.createPg();





//   db.public.none(`
//     CREATE TABLE orders (
//       id SERIAL PRIMARY KEY,
//       order_number VARCHAR(100) NOT NULL,
//       article VARCHAR(100) NOT NULL,
//       order_date DATE NOT NULL,
//       delivery_date DATE,
//       pickup_address TEXT,
//       client_name VARCHAR(200),
//       pickup_code VARCHAR(50),
//       status VARCHAR(50) DEFAULT 'новый'
//     );
//   `);

//   db.public.none(`
//     CREATE TABLE users (
//       id SERIAL PRIMARY KEY,
//       role VARCHAR(50) NOT NULL,
//       full_name VARCHAR(200) NOT NULL,
//       login VARCHAR(100) NOT NULL,
//       password VARCHAR(100) NOT NULL
//     );
//   `);





// //   await client.query(`
// //   CREATE TABLE orders (
// //     id SERIAL PRIMARY KEY,
// //     order_number VARCHAR(100) NOT NULL,
// //     article VARCHAR(100) NOT NULL,
// //     order_date DATE NOT NULL,
// //     delivery_date DATE,
// //     pickup_address TEXT,
// //     client_name VARCHAR(200),
// //     pickup_code VARCHAR(50),
// //     status VARCHAR(50) DEFAULT 'новый'
// //   );
// // `);


//   await importUsersFromExcel(db, 'user_import.xlsx');
//   await importOrdersFromExcel(db, 'order_import.xlsx');













//   return client;
// };







// // Функция для импорта данных
// async function importUsersFromExcel(client, filePath) {
//   try {
//     // Читаем .xlsx файл
//     const workbook = XLSX.readFile(filePath);
//     const sheetName = workbook.SheetNames[0]; // Первая вкладка
//     const worksheet = workbook.Sheets[sheetName];

//     // Конвертируем в CSV (опционально, но полезно для отладки)
//     const csvData = XLSX.utils.sheet_to_csv(worksheet);

//     // Парсим CSV и вставляем в базу
//     const results = [];
//     const parser = csv();

//     parser.on('data', (row) => {
//       results.push(row);
//     });

//     parser.on('end', async () => {
//       for (const row of results) {
//         // Предполагаем столбцы: role, full_name, login, password
//         await client.query(
//           'INSERT INTO users (role, full_name, login, password) VALUES (\$1, \$2, \$3, \$4)',
//           [row.role, row.full_name, row.login, row.password]
//         );
//       }
//       console.log('Импорт завершён!');
//     });

//     // Преобразуем CSV-строку в поток и парсим
//     const csvStream = new Transform();
//     csvStream._transform = (chunk, encoding, callback) => {
//       callback(null, chunk);
//     };
//     csvStream.push(csvData);
//     csvStream.pipe(parser);

//   } catch (error) {
//     console.error('Ошибка импорта:', error);
//   }
// }









// async function importOrdersFromExcel(client, filePath) {
//   try {
//     // Читаем .xlsx файл
//     const workbook = XLSX.readFile(filePath);
//     const sheetName = workbook.SheetNames[0]; // Первая вкладка
//     const worksheet = workbook.Sheets[sheetName];

//     // Конвертируем в CSV для парсинга
//     const csvData = XLSX.utils.sheet_to_csv(worksheet);

//     // Парсим CSV и вставляем в базу
//     const results = [];
//     const parser = csv();

//     parser.on('data', (row) => {
//       results.push(row);
//     });

//     parser.on('end', async () => {
//       for (const row of results) {
//         try {
//           // Предполагаем столбцы: order_number, article, order_date, delivery_date, 
//           // pickup_address, client_name, pickup_code, status
//           await client.query(
//             `INSERT INTO orders (
//               order_number, 
//               article, 
//               order_date, 
//               delivery_date, 
//               pickup_address, 
//               client_name, 
//               pickup_code, 
//               status
//             ) VALUES (\$1, \$2, \$3, \$4, \$5, \$6, \$7, \$8)`,
//             [
//               row.order_number || row['номер заказа'],
//               row.article || row['артикул заказа'],
//               row.order_date || row['дата заказа'],
//               row.delivery_date || row['дата доставки'],
//               row.pickup_address || row['адрес пункта выдачи'],
//               row.client_name || row['ФИО авторизованного клиента'],
//               row.pickup_code || row['код для получения'],
//               row.status || row['статус заказа']
//             ]
//           );
//           console.log(`Добавлен заказ: ${row.order_number || row['номер заказа']}`);
//         } catch (rowError) {
//           console.error(`Ошибка при добавлении строки:`, row, rowError);
//         }
//       }
//       console.log('Импорт заказов завершён!');
//     });

//     parser.on('error', (error) => {
//       console.error('Ошибка парсинга CSV:', error);
//     });

//     // Преобразуем CSV-строку в поток и парсим
//     const csvStream = new Transform();
//     csvStream._transform = (chunk, encoding, callback) => {
//       callback(null, chunk);
//     };
//     csvStream.push(csvData);
//     csvStream.end();
//     csvStream.pipe(parser);

//   } catch (error) {
//     console.error('Ошибка импорта заказов:', error);
//     throw error;
//   }
// }

















// // Если у тебя есть готовый SQL-скрипт (например, из PostgreSQL), просто вставь его в client.query().


//  // Создаём таблицы (пример: таблица пользователей)
//   // await client.query(`
//   //   CREATE TABLE IF NOT EXISTS users (
//   //     id SERIAL PRIMARY KEY,
//   //     name VARCHAR(255) NOT NULL,
//   //     email VARCHAR(255) UNIQUE,
//   //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   //   );
//   // `);

//   // // Добавь другие таблицы по аналогии
//   // await client.query(`
//   //   CREATE TABLE IF NOT EXISTS products (
//   //     id SERIAL PRIMARY KEY,
//   //     name VARCHAR(255) NOT NULL,
//   //     price DECIMAL(10, 2),
//   //     user_id INTEGER REFERENCES users(id)
//   //   );
//   // `);





/////////////////////////////////////////////////////////////////////////











// 130925
//////////////////////
//////////////////////
// import { newDb } from 'pg-mem';
// import * as XLSX from 'xlsx';
// import csv from 'csv-parser';
// import { Transform } from 'stream';
// import { readFileSync } from 'fs';
// import { app } from 'electron';
// import path from 'path';

// export default async () => {
//   const db = newDb();

//   // Создаем таблицы
//   db.public.none(`
//     CREATE TABLE pickup_points (
//       id SERIAL PRIMARY KEY,
//       address TEXT NOT NULL UNIQUE
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
//       client_name VARCHAR(200),
//       pickup_code VARCHAR(50),
//       status VARCHAR(50) DEFAULT 'новый'
//     );
//   `);

//   db.public.none(`
//     CREATE TABLE users (
//       id SERIAL PRIMARY KEY,
//       role VARCHAR(50) NOT NULL,
//       full_name VARCHAR(200) NOT NULL,
//       login VARCHAR(100) NOT NULL,
//       password VARCHAR(100) NOT NULL
//     );
//   `);



//   db.public.none(`
//   CREATE TABLE goods (
//     id SERIAL PRIMARY KEY,
//     article VARCHAR(100) NOT NULL UNIQUE,
//     name VARCHAR(200) NOT NULL,
//     unit VARCHAR(50) DEFAULT 'шт.',
//     price NUMERIC NOT NULL,
//     supplier VARCHAR(200),
//     manufacturer VARCHAR(200),
//     category VARCHAR(100),
//     discount NUMERIC DEFAULT 0,
//     stock_quantity INTEGER DEFAULT 0,
//     description TEXT,
//     photo_url TEXT
//   );
// `);

//   const userFilePath = path.join(app.getAppPath(), 'src', 'main', 'user_import.xlsx');
//   const orderFilePath = path.join(app.getAppPath(), 'src', 'main', 'order_import.xlsx');
//   const goodsFilePath = path.join(app.getAppPath(), 'src', 'main', 'goods_import.xlsx');
//   const pointsFilePath = path.join(app.getAppPath(), 'src', 'main', 'points_import.xlsx');

//   // Импортируем данные
//   await importUsersFromExcel(db, userFilePath);
//   await importOrdersFromExcel(db, orderFilePath);
//   await importGoodsFromExcel(db, goodsFilePath);
//   await importPickupPointsFromExcel(db, pointsFilePath);

//   return db;
// };

// async function importUsersFromExcel(db, filePath) {
//   try {
//     if (!fs.existsSync(filePath)) {
//       console.warn(`Файл пользователей не найден: ${filePath}`);
//       return;
//     }

//     const workbook = XLSX.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
    
//     // Конвертируем напрямую в JSON, минуя CSV
//     const jsonData = XLSX.utils.sheet_to_json(worksheet);

//     console.log('Данные пользователей:', jsonData);

//     for (const row of jsonData) {
//       try {
//         // Используем английские названия столбцов или русские как fallback
//         await db.public.none(
//           'INSERT INTO users (role, full_name, login, password) VALUES ($1, $2, $3, $4)',
//           [
//             row.role || row['Роль'],
//             row.full_name || row['ФИО'],
//             row.login || row['Логин'],
//             row.password || row['Пароль']
//           ]
//         );
//         console.log('Добавлен пользователь:', row.login || row['Логин']);
//       } catch (rowError) {
//         console.error('Ошибка при добавлении пользователя:', row, rowError);
//       }
//     }
    
//     console.log('Импорт пользователей завершён!');

//   } catch (error) {
//     console.error('Ошибка импорта пользователей:', error);
//   }
// }

// async function importPickupPointsFromExcel(db, filePath) {
//   try {
//     if (!fs.existsSync(filePath)) {
//       console.warn(`Файл пунктов выдачи не найден: ${filePath}`);
//       return;
//     }

//     const workbook = XLSX.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
    
//     const jsonData = XLSX.utils.sheet_to_json(worksheet);

//     console.log('Данные пунктов выдачи:', jsonData);

//     for (const row of jsonData) {
//       try {
//         await db.public.none(
//           'INSERT INTO pickup_points (address) VALUES ($1)',
//           [row.address || row['адрес пункта выдачи']]
//         );
//         console.log('Добавлен пункт выдачи:', row.address || row['адрес пункта выдачи']);
//       } catch (rowError) {
//         console.error('Ошибка при добавлении пункта выдачи:', row, rowError);
//       }
//     }
    
//     console.log('Импорт пунктов выдачи завершён!');

//   } catch (error) {
//     console.error('Ошибка импорта пунктов выдачи:', error);
//   }
// }

// async function importOrdersFromExcel(db, filePath) {
//   try {
//     if (!fs.existsSync(filePath)) {
//       console.warn(`Файл заказов не найден: ${filePath}`);
//       return;
//     }

//     const workbook = XLSX.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
    
//     const jsonData = XLSX.utils.sheet_to_json(worksheet);

//     console.log('Данные заказов:', jsonData);

//     // Сначала получаем все пункты выдачи для сопоставления адресов с ID
//     const pickupPoints = await db.public.many('SELECT id, address FROM pickup_points');
//     const addressToIdMap = {};
//     pickupPoints.forEach(point => {
//       addressToIdMap[point.address] = point.id;
//     });

//     for (const row of jsonData) {
//       try {
//         const pickupAddress = row.pickup_address || row['адрес пункта выдачи'];
//         const pickupAddressId = addressToIdMap[pickupAddress] || null;

//         await db.public.none(
//           `INSERT INTO orders (
//             order_number, 
//             article, 
//             order_date, 
//             delivery_date, 
//             pickup_address_id, 
//             client_name, 
//             pickup_code, 
//             status
//           ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
//           [
//             row.order_number || row['номер заказа'],
//             row.article || row['артикул заказа'],
//             row.order_date || row['дата заказа'],
//             row.delivery_date || row['дата доставки'],
//             pickupAddressId,
//             row.client_name || row['ФИО авторизованного клиента'],
//             row.pickup_code || row['код для получения'],
//             row.status || row['статус заказа'] || 'новый'
//           ]
//         );
//         console.log('Добавлен заказ:', row.order_number || row['номер заказа']);
//       } catch (rowError) {
//         console.error('Ошибка при добавлении заказа:', row, rowError);
//       }
//     }
    
//     console.log('Импорт заказов завершён!');

//   } catch (error) {
//     console.error('Ошибка импорта заказов:', error);
//   }
// }




// async function importGoodsFromExcel(db, filePath) {
//   try {
//     if (!fs.existsSync(filePath)) {
//       console.warn(`Файл товаров не найден: ${filePath}`);
//       return;
//     }

//     const workbook = XLSX.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
    
//     const jsonData = XLSX.utils.sheet_to_json(worksheet);

//     console.log('Данные товаров:', jsonData);

//     for (const row of jsonData) {
//       try {
//         await db.public.none(
//           `INSERT INTO goods (
//             article, 
//             name, 
//             unit, 
//             price, 
//             supplier, 
//             manufacturer, 
//             category, 
//             discount, 
//             stock_quantity, 
//             description, 
//             photo_url
//           ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
//           [
//             row.article || row['артикул'],
//             row.name || row['наименование товара'],
//             row.unit || row['единица измерения'] || 'шт.',
//             row.price || row['цена'],
//             row.supplier || row['поставщик'],
//             row.manufacturer || row['производитель'],
//             row.category || row['категория товара'],
//             row.discount || row['действующая скидка'] || 0,
//             row.stock_quantity || row['количество на складе'] || 0,
//             row.description || row['описание товара'],
//             row.photo_url || row['фотография']
//           ]
//         );
//         console.log('Добавлен товар:', row.article || row['артикул']);
//       } catch (rowError) {
//         console.error('Ошибка при добавлении товара:', row, rowError);
//       }
//     }
    
//     console.log('Импорт товаров завершён!');

//   } catch (error) {
//     console.error('Ошибка импорта товаров:', error);
//   }
// }















///////////////////////////////////////////////////////////////////////////////////////////////////



















// 140925_1
///////////////////////////////////
///////////////////////////////////

// import { newDb } from 'pg-mem';
// import * as XLSX from 'xlsx';
// import csv from 'csv-parser';
// import { Transform } from 'stream';
// //import { readFileSync } from 'fs';
// import { readFileSync, existsSync } from 'fs'; // Правильный импорт fs
// import { app } from 'electron';
// import path from 'path';

// export default async () => {
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

//   const userFilePath = path.join(app.getAppPath(), 'src', 'main', 'user_import.xlsx');
//   const orderFilePath = path.join(app.getAppPath(), 'src', 'main', 'order_import.xlsx');
//   const goodsFilePath = path.join(app.getAppPath(), 'src', 'main', 'goods_import.xlsx');
//   const pointsFilePath = path.join(app.getAppPath(), 'src', 'main', 'points_import.xlsx');

//   // Импортируем данные (важен порядок!)
//   await importUsersFromExcel(db, userFilePath);
//   await importPickupPointsFromExcel(db, pointsFilePath);
//   await importOrdersFromExcel(db, orderFilePath);
//   await importGoodsFromExcel(db, goodsFilePath);

//   return db;
// };

// async function importUsersFromExcel(db, filePath) {

//     try {
//       if (!existsSync(filePath)) { // Используем existsSync из fs
//         console.warn(`Файл пользователей не найден: ${filePath}`);
//         return;
//       }
  
      

//     const workbook = XLSX.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
    
//     const jsonData = XLSX.utils.sheet_to_json(worksheet);

//     console.log('Данные пользователей:', jsonData);

//     for (const row of jsonData) {
//       try {
//         await db.public.none(
//           'INSERT INTO users (role, full_name, login, password) VALUES ($1, $2, $3, $4)',
//           [
//             row.role || row['Роль'],
//             row.full_name || row['ФИО'],
//             row.login || row['Логин'],
//             row.password || row['Пароль']
//           ]
//         );
//         console.log('Добавлен пользователь:', row.login || row['Логин']);
//       } catch (rowError) {
//         console.error('Ошибка при добавлении пользователя:', row, rowError);
//       }
//     }
    
//     console.log('Импорт пользователей завершён!');

//   } catch (error) {
//     console.error('Ошибка импорта пользователей:', error);
//   }
// }

// async function importPickupPointsFromExcel(db, filePath) {
//   try {
//     if (!fs.existsSync(filePath)) {
//       console.warn(`Файл пунктов выдачи не найден: ${filePath}`);
//       return;
//     }

//     const workbook = XLSX.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
    
//     const jsonData = XLSX.utils.sheet_to_json(worksheet);

//     console.log('Данные пунктов выдачи:', jsonData);

//     for (const row of jsonData) {
//       try {
//         await db.public.none(
//           'INSERT INTO pickup_points (address) VALUES ($1)',
//           [row.address || row['адрес пункта выдачи']]
//         );
//         console.log('Добавлен пункт выдачи:', row.address || row['адрес пункта выдачи']);
//       } catch (rowError) {
//         console.error('Ошибка при добавлении пункта выдачи:', row, rowError);
//       }
//     }
    
//     console.log('Импорт пунктов выдачи завершён!');

//   } catch (error) {
//     console.error('Ошибка импорта пунктов выдачи:', error);
//   }
// }

// async function importOrdersFromExcel(db, filePath) {
//   try {
//     if (!fs.existsSync(filePath)) {
//       console.warn(`Файл заказов не найден: ${filePath}`);
//       return;
//     }

//     const workbook = XLSX.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
    
//     const jsonData = XLSX.utils.sheet_to_json(worksheet);

//     console.log('Данные заказов:', jsonData);

//     // Получаем все пункты выдачи для сопоставления адресов с ID
//     const pickupPoints = await db.public.many('SELECT id, address FROM pickup_points');
//     const addressToIdMap = {};
//     pickupPoints.forEach(point => {
//       addressToIdMap[point.address] = point.id;
//     });

//     // Получаем всех пользователей для сопоставления ФИО с ID
//     const users = await db.public.many('SELECT id, full_name FROM users');
//     const nameToIdMap = {};
//     users.forEach(user => {
//       nameToIdMap[user.full_name] = user.id;
//     });

//     for (const row of jsonData) {
//       try {
//         const pickupAddress = row.pickup_address || row['адрес пункта выдачи'];
//         const pickupAddressId = addressToIdMap[pickupAddress] || null;

//         const clientName = row.client_name || row['ФИО авторизованного клиента'];
//         const clientId = nameToIdMap[clientName] || null;

//         await db.public.none(
//           `INSERT INTO orders (
//             order_number, 
//             article, 
//             order_date, 
//             delivery_date, 
//             pickup_address_id, 
//             client_id,
//             client_name, 
//             pickup_code, 
//             status
//           ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
//           [
//             row.order_number || row['номер заказа'],
//             row.article || row['артикул заказа'],
//             row.order_date || row['дата заказа'],
//             row.delivery_date || row['дата доставки'],
//             pickupAddressId,
//             clientId,
//             clientName,
//             row.pickup_code || row['код для получения'],
//             row.status || row['статус заказа'] || 'новый'
//           ]
//         );
//         console.log('Добавлен заказ:', row.order_number || row['номер заказа']);
//       } catch (rowError) {
//         console.error('Ошибка при добавлении заказа:', row, rowError);
//       }
//     }
    
//     console.log('Импорт заказов завершён!');

//   } catch (error) {
//     console.error('Ошибка импорта заказов:', error);
//   }
// }

// async function importGoodsFromExcel(db, filePath) {
//   try {
//     if (!fs.existsSync(filePath)) {
//       console.warn(`Файл товаров не найден: ${filePath}`);
//       return;
//     }

//     const workbook = XLSX.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
    
//     const jsonData = XLSX.utils.sheet_to_json(worksheet);

//     console.log('Данные товаров:', jsonData);

//     for (const row of jsonData) {
//       try {
//         await db.public.none(
//           `INSERT INTO goods (
//             article, 
//             name, 
//             unit, 
//             price, 
//             supplier, 
//             manufacturer, 
//             category, 
//             discount, 
//             stock_quantity, 
//             description, 
//             photo_url
//           ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
//           [
//             row.article || row['артикул'],
//             row.name || row['наименование товара'],
//             row.unit || row['единица измерения'] || 'шт.',
//             row.price || row['цена'],
//             row.supplier || row['поставщик'],
//             row.manufacturer || row['производитель'],
//             row.category || row['категория товара'],
//             row.discount || row['действующая скидка'] || 0,
//             row.stock_quantity || row['количество на складе'] || 0,
//             row.description || row['описание товара'],
//             row.photo_url || row['фотография']
//           ]
//         );
//         console.log('Добавлен товар:', row.article || row['артикул']);
//       } catch (rowError) {
//         console.error('Ошибка при добавлении товара:', row, rowError);
//       }
//     }
    
//     console.log('Импорт товаров завершён!');

//   } catch (error) {
//     console.error('Ошибка импорта товаров:', error);
//   }
// }








// 140925_2
// import { newDb } from 'pg-mem';
// import * as XLSX from 'xlsx';
// import { existsSync } from 'fs'; // Правильный импорт
// import { app } from 'electron';
// import path from 'path';

// export default async () => {
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

//   const userFilePath = path.join(app.getAppPath(), 'src', 'main', 'user_import.xlsx');
//   const orderFilePath = path.join(app.getAppPath(), 'src', 'main', 'order_import.xlsx');
//   const goodsFilePath = path.join(app.getAppPath(), 'src', 'main', 'goods_import.xlsx');
//   const pointsFilePath = path.join(app.getAppPath(), 'src', 'main', 'points_import.xlsx');

//   // Импортируем данные (важен порядок!)
//   await importUsersFromExcel(db, userFilePath);
//   await importPickupPointsFromExcel(db, pointsFilePath);
//   await importOrdersFromExcel(db, orderFilePath);
//   await importGoodsFromExcel(db, goodsFilePath);

//   return db;
// };

// async function importUsersFromExcel(db, filePath) {
//   try {
//     if (!existsSync(filePath)) {
//       console.warn(`Файл пользователей не найден: ${filePath}`);
//       return;
//     }

//     const workbook = XLSX.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
    
//     const jsonData = XLSX.utils.sheet_to_json(worksheet);

//     console.log('Данные пользователей:', jsonData);

//     for (const row of jsonData) {
//       try {
//         await db.public.none(
//           'INSERT INTO users (role, full_name, login, password) VALUES ($1, $2, $3, $4)',
//           [
//             row.role || row['Роль'],
//             row.full_name || row['ФИО'],
//             row.login || row['Логин'],
//             row.password || row['Пароль']
//           ]
//         );
//         console.log('Добавлен пользователь:', row.login || row['Логин']);
//       } catch (rowError) {
//         console.error('Ошибка при добавлении пользователя:', row, rowError);
//       }
//     }
    
//     console.log('Импорт пользователей завершён!');

//   } catch (error) {
//     console.error('Ошибка импорта пользователей:', error);
//   }
// }

// async function importPickupPointsFromExcel(db, filePath) {
//   try {
//     if (!existsSync(filePath)) { // ИСПРАВЛЕНО: existsSync вместо fs.existsSync
//       console.warn(`Файл пунктов выдачи не найден: ${filePath}`);
//       return;
//     }

//     const workbook = XLSX.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
    
//     const jsonData = XLSX.utils.sheet_to_json(worksheet);

//     console.log('Данные пунктов выдачи:', jsonData);

//     for (const row of jsonData) {
//       try {
//         await db.public.none(
//           'INSERT INTO pickup_points (address) VALUES ($1)',
//           [row.address || row['адрес пункта выдачи']]
//         );
//         console.log('Добавлен пункт выдачи:', row.address || row['адрес пункта выдачи']);
//       } catch (rowError) {
//         console.error('Ошибка при добавлении пункта выдачи:', row, rowError);
//       }
//     }
    
//     console.log('Импорт пунктов выдачи завершён!');

//   } catch (error) {
//     console.error('Ошибка импорта пунктов выдачи:', error);
//   }
// }

// async function importOrdersFromExcel(db, filePath) {
//   try {
//     if (!existsSync(filePath)) { // ИСПРАВЛЕНО: existsSync вместо fs.existsSync
//       console.warn(`Файл заказов не найден: ${filePath}`);
//       return;
//     }

//     const workbook = XLSX.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
    
//     const jsonData = XLSX.utils.sheet_to_json(worksheet);

//     console.log('Данные заказов:', jsonData);

//     // Получаем все пункты выдачи для сопоставления адресов с ID
//     const pickupPoints = await db.public.many('SELECT id, address FROM pickup_points');
//     const addressToIdMap = {};
//     pickupPoints.forEach(point => {
//       addressToIdMap[point.address] = point.id;
//     });

//     // Получаем всех пользователей для сопоставления ФИО с ID
//     const users = await db.public.many('SELECT id, full_name FROM users');
//     const nameToIdMap = {};
//     users.forEach(user => {
//       nameToIdMap[user.full_name] = user.id;
//     });

//     for (const row of jsonData) {
//       try {
//         const pickupAddress = row.pickup_address || row['адрес пункта выдачи'];
//         const pickupAddressId = addressToIdMap[pickupAddress] || null;

//         const clientName = row.client_name || row['ФИО авторизованного клиента'];
//         const clientId = nameToIdMap[clientName] || null;

//         await db.public.none(
//           `INSERT INTO orders (
//             order_number, 
//             article, 
//             order_date, 
//             delivery_date, 
//             pickup_address_id, 
//             client_id,
//             client_name, 
//             pickup_code, 
//             status
//           ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
//           [
//             row.order_number || row['номер заказа'],
//             row.article || row['артикул заказа'],
//             row.order_date || row['дата заказа'],
//             row.delivery_date || row['дата доставки'],
//             pickupAddressId,
//             clientId,
//             clientName,
//             row.pickup_code || row['код для получения'],
//             row.status || row['статус заказа'] || 'новый'
//           ]
//         );
//         console.log('Добавлен заказ:', row.order_number || row['номер заказа']);
//       } catch (rowError) {
//         console.error('Ошибка при добавлении заказа:', row, rowError);
//       }
//     }
    
//     console.log('Импорт заказов завершён!');

//   } catch (error) {
//     console.error('Ошибка импорта заказов:', error);
//   }
// }

// async function importGoodsFromExcel(db, filePath) {
//   try {
//     if (!existsSync(filePath)) { // ИСПРАВЛЕНО: existsSync вместо fs.existsSync
//       console.warn(`Файл товаров не найден: ${filePath}`);
//       return;
//     }

//     const workbook = XLSX.readFile(filePath);
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];
    
//     const jsonData = XLSX.utils.sheet_to_json(worksheet);

//     console.log('Данные товаров:', jsonData);

//     for (const row of jsonData) {
//       try {
//         await db.public.none(
//           `INSERT INTO goods (
//             article, 
//             name, 
//             unit, 
//             price, 
//             supplier, 
//             manufacturer, 
//             category, 
//             discount, 
//             stock_quantity, 
//             description, 
//             photo_url
//           ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
//           [
//             row.article || row['артикул'],
//             row.name || row['наименование товара'],
//             row.unit || row['единица измерения'] || 'шт.',
//             row.price || row['цена'],
//             row.supplier || row['поставщик'],
//             row.manufacturer || row['производитель'],
//             row.category || row['категория товара'],
//             row.discount || row['действующая скидка'] || 0,
//             row.stock_quantity || row['количество на складе'] || 0,
//             row.description || row['описание товара'],
//             row.photo_url || row['фотография']
//           ]
//         );
//         console.log('Добавлен товар:', row.article || row['артикул']);
//       } catch (rowError) {
//         console.error('Ошибка при добавлении товара:', row, rowError);
//       }
//     }
    
//     console.log('Импорт товаров завершён!');

//   } catch (error) {
//     console.error('Ошибка импорта товаров:', error);
//   }
// }









// 140925_3
import { newDb } from 'pg-mem';

// Создаем и настраиваем базу данных
export const initDatabase = () => {
  const db = newDb();

  // Создаем таблицы
  db.public.none(`
    CREATE TABLE pickup_points (
      id SERIAL PRIMARY KEY,
      address TEXT NOT NULL UNIQUE
    );
  `);

  db.public.none(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      role VARCHAR(50) NOT NULL,
      full_name VARCHAR(200) NOT NULL UNIQUE,
      login VARCHAR(100) NOT NULL,
      password VARCHAR(100) NOT NULL
    );
  `);

  db.public.none(`
    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      order_number VARCHAR(100) NOT NULL,
      article VARCHAR(100) NOT NULL,
      order_date DATE NOT NULL,
      delivery_date DATE,
      pickup_address_id INTEGER REFERENCES pickup_points(id),
      client_id INTEGER REFERENCES users(id),
      client_name VARCHAR(200),
      pickup_code VARCHAR(50),
      status VARCHAR(50) DEFAULT 'новый'
    );
  `);

  db.public.none(`
    CREATE TABLE goods (
      id SERIAL PRIMARY KEY,
      article VARCHAR(100) NOT NULL UNIQUE,
      name VARCHAR(200) NOT NULL,
      unit VARCHAR(50) DEFAULT 'шт.',
      price NUMERIC NOT NULL,
      supplier VARCHAR(200),
      manufacturer VARCHAR(200),
      category VARCHAR(100),
      discount NUMERIC DEFAULT 0,
      stock_quantity INTEGER DEFAULT 0,
      description TEXT,
      photo_url TEXT
    );
  `);

  // Добавляем тестовые данные
  addTestData(db);

  return db;
};

// Функция для добавления тестовых данных
const addTestData = (db) => {
  try {
    // Пользователи
    db.public.none(`
      INSERT INTO users (role, full_name, login, password) VALUES
      ('Администратор', 'Иванов Иван Иванович', 'admin', 'admin123'),
      ('Менеджер', 'Петров Петр Петрович', 'manager', 'manager123'),
      ('Клиент', 'Сидоров Алексей Владимирович', 'client', 'client123')
    `);

    // Пункты выдачи
    db.public.none(`
      INSERT INTO pickup_points (address) VALUES
      ('ул. Ленина, д. 10'),
      ('пр. Мира, д. 25'),
      ('ул. Центральная, д. 5')
    `);

    // Товары
    db.public.none(`
      INSERT INTO goods (article, name, unit, price, supplier, manufacturer, category, discount, stock_quantity, description, photo_url) VALUES
      ('SH001', 'Кроссовки спортивные', 'шт.', 4999, 'ООО СпортТовары', 'Nike', 'Обувь', 10, 25, 'Удобные кроссовки для бега и занятий спортом', ''),
      ('SH002', 'Туфли классические', 'шт.', 3599, 'ЗАО МоднаяОбувь', 'ECCO', 'Обувь', 5, 15, 'Элегантные туфли для офиса и торжественных мероприятий', ''),
      ('SH003', 'Сапоги зимние', 'шт.', 6999, 'ИП ЗимняяОбувь', 'Columbia', 'Обувь', 20, 8, 'Теплые зимние сапоги с мехом', ''),
      ('SH004', 'Ботинки рабочие', 'шт.', 2999, 'ООО ПрофОбувь', 'Timberland', 'Обувь', 0, 30, 'Прочные ботинки для работы и активного отдыха', ''),
      ('SH005', 'Тапочки домашние', 'шт.', 999, 'ИП УютныйДом', 'HomeWear', 'Обувь', 0, 50, 'Мягкие и удобные домашние тапочки', '')
    `);

    // Заказы
    db.public.none(`
      INSERT INTO orders (order_number, article, order_date, delivery_date, pickup_address_id, client_id, client_name, pickup_code, status) VALUES
      ('ORD001', 'SH001', '2024-01-15', '2024-01-20', 1, 3, 'Сидоров Алексей Владимирович', 'A123', 'доставлен'),
      ('ORD002', 'SH003', '2024-01-16', '2024-01-22', 2, 3, 'Сидоров Алексей Владимирович', 'B456', 'в обработке'),
      ('ORD003', 'SH002', '2024-01-17', NULL, 3, 3, 'Сидоров Алексей Владимирович', 'C789', 'новый')
    `);

    console.log('Тестовые данные добавлены в базу');
  } catch (error) {
    console.error('Ошибка при добавлении тестовых данных:', error);
  }
};

// Функции для работы с данными
export const dbAPI = {
  getProducts: (db) => {
    try {
      return db.public.many('SELECT * FROM goods ORDER BY name');
    } catch (error) {
      console.error('Ошибка получения товаров:', error);
      return [];
    }
  },

  getOrders: (db) => {
    try {
      return db.public.many(`
        SELECT o.*, pp.address as pickup_address 
        FROM orders o 
        LEFT JOIN pickup_points pp ON o.pickup_address_id = pp.id 
        ORDER BY o.order_date DESC
      `);
    } catch (error) {
      console.error('Ошибка получения заказов:', error);
      return [];
    }
  },

  authorizeUser: (db, login, password) => {
    try {
      const users = db.public.many(
        'SELECT id, role, full_name, login FROM users WHERE login = $1 AND password = $2',
        [login, password]
      );
      return users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      return null;
    }
  }
};
