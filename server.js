const http = require("http");
const fs = require("fs");
const { resolveSoa } = require("dns");

// createServer prend en parametre une callback function qui est declanché
// a chaque fois qu'une requetes est reçu par notre serveur
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  // on specifie le type de contenu que l'on renvoie dans le header de la réponse
  res.setHeader("Content-Type", "text/html");

  let path = "./views/";

  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      res.statusCode = 200;
      path += "about.html";
      break;
    default:
      res.statusCode = 404;
      path += "404.html";
  }

  // renvoie d'un fichier html au client
  const htmlResponse = fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      // on precise end ici car si une erreur est rencontré la requete ne sera
      // jamais fermé
      res.end();
    } else {
      // res.write(data);
      // res.end();

      // shortcut pour ecrire et fermé
      res.end(data);
    }
  });
});

// permet a notre server de ce mettre en mode ecoute sur le port specifié
// localhost est le nom de notre hote (on specifie localhost pr que notre pc fasse office de serveur) 127.0.0.1
// la callback fonction est declanché quand le serveur commence a écouter
server.listen(3000, "localhost", () => {
  console.log("my server start listening on port 3000");
});
