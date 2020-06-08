const sqlite = require("sqlite3").verbose();

const db = new sqlite.Database("./src/database/database.db");

module.exports = db;

// db.serialize(() => {
//   db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             name TEXT,
//             image TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `);

// const query = `
//     INSERT INTO places (
//         image,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         items
//     ) VALUES ( ?,?,?,?,?,?,? );
//     `;

// const values = [
//   "https://images.unsplash.com/photo-1501397605259-3ba06b1c69ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
//   "Colectoria",
//   "Rua Elias Calvacanti de Albuquerque, Cristo Redentor",
//   "349",
//   "Paraíba",
//   "João Pessoa",
//   "Resíduos Eletrônicos, Lâmpadas",
// ];

// function afterInsertData(error) {
//   if (error) {
//     return console.log(error);
//   }

//   console.log("Cadastrado com sucesso!");
//   console.log(this);
// }

// db.run(query, values, afterInsertData);

//   db.all("select * from places", function (error, rows) {
//     if (error) {
//       return console.log(error);
//     }

//     console.log("Aqui estão seus registros!");
//     console.log(rows);
//   });
// });
