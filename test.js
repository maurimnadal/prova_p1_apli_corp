const mysql = require('mysql2/promise');

async function test() {
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'ifrs_voluntariado'
  });
  console.log('Conexão OK ✅');
  await connection.end();
}

test();
