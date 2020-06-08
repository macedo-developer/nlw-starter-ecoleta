const express = require("express");

const server = express();

const db = require("./database/db");

server.use(express.static("public"));

server.use(express.urlencoded({ extended: true }));

//Utilizando template engine
const nunjucks = require("nunjucks");

nunjucks.configure("src/views", { express: server, noCache: true });

server.get("/", (req, res) => {
  return res.render("index.html");
});

server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {
  const { name, image, address, address2, city, state, items } = req.body;

  const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES ( ?,?,?,?,?,?,? );
    `;

  const values = [image, name, address, address2, state, city, items];

  function afterInsertData(error) {
    if (error) {
      console.log(error);
      return res.send("Erro ao cadastrar");
    }

    return res.render("create-point.html", { saved: true });
  }

  db.run(query, values, afterInsertData);
});

server.get("/search", (req, res) => {
  const { search } = req.query;
  db.all("SELECT * FROM places WHERE city = ?", [search], function (
    error,
    rows
  ) {
    if (error) {
      return console.log(error);
    }

    const total = rows.length;

    return res.render("search-results.html", { places: rows, total });
  });
});

server.listen(3001);
