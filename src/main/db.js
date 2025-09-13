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













import { newDb } from 'pg-mem';
import * as XLSX from 'xlsx';
import csv from 'csv-parser';
import { Transform } from 'stream';
import { readFileSync } from 'fs';
import { app } from 'electron';
import path from 'path';

export default async () => {
  const db = newDb();

  // Создаем таблицы
  db.public.none(`
    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      order_number VARCHAR(100) NOT NULL,
      article VARCHAR(100) NOT NULL,
      order_date DATE NOT NULL,
      delivery_date DATE,
      pickup_address TEXT,
      client_name VARCHAR(200),
      pickup_code VARCHAR(50),
      status VARCHAR(50) DEFAULT 'новый'
    );
  `);

  db.public.none(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      role VARCHAR(50) NOT NULL,
      full_name VARCHAR(200) NOT NULL,
      login VARCHAR(100) NOT NULL,
      password VARCHAR(100) NOT NULL
    );
  `);


  //   const userFilePath = path.join(app.getAppPath(), 'user_import.xlsx');
  // const orderFilePath = path.join(app.getAppPath(), 'order_import.xlsx');
  const userFilePath = path.join(app.getAppPath(), 'src', 'main', 'user_import.xlsx');
  const orderFilePath = path.join(app.getAppPath(), 'src', 'main', 'order_import.xlsx');


  // Импортируем данные
  await importUsersFromExcel(db, userFilePath);
  await importOrdersFromExcel(db, orderFilePath);

  return db;
};

async function importUsersFromExcel(db, filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`Файл пользователей не найден: ${filePath}`);
      return;
    }

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Конвертируем напрямую в JSON, минуя CSV
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    console.log('Данные пользователей:', jsonData);

    for (const row of jsonData) {
      try {
        // Используем английские названия столбцов или русские как fallback
        await db.public.none(
          'INSERT INTO users (role, full_name, login, password) VALUES ($1, $2, $3, $4)',
          [
            row.role || row['Роль'],
            row.full_name || row['ФИО'],
            row.login || row['Логин'],
            row.password || row['Пароль']
          ]
        );
        console.log('Добавлен пользователь:', row.login || row['Логин']);
      } catch (rowError) {
        console.error('Ошибка при добавлении пользователя:', row, rowError);
      }
    }
    
    console.log('Импорт пользователей завершён!');

  } catch (error) {
    console.error('Ошибка импорта пользователей:', error);
  }
}

async function importOrdersFromExcel(db, filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`Файл заказов не найден: ${filePath}`);
      return;
    }

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Конвертируем напрямую в JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    console.log('Данные заказов:', jsonData);

    for (const row of jsonData) {
      try {
        await db.public.none(
          `INSERT INTO orders (
            order_number, 
            article, 
            order_date, 
            delivery_date, 
            pickup_address, 
            client_name, 
            pickup_code, 
            status
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [
            row.order_number || row['номер заказа'],
            row.article || row['артикул заказа'],
            row.order_date || row['дата заказа'],
            row.delivery_date || row['дата доставки'],
            row.pickup_address || row['адрес пункта выдачи'],
            row.client_name || row['ФИО авторизованного клиента'],
            row.pickup_code || row['код для получения'],
            row.status || row['статус заказа'] || 'новый'
          ]
        );
        console.log('Добавлен заказ:', row.order_number || row['номер заказа']);
      } catch (rowError) {
        console.error('Ошибка при добавлении заказа:', row, rowError);
      }
    }
    
    console.log('Импорт заказов завершён!');

  } catch (error) {
    console.error('Ошибка импорта заказов:', error);
  }
}
