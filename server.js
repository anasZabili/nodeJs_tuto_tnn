const http = require("http");

// createServer prend en parametre une callback function qui est declanché
// a chaque fois qu'une requetes est reçu par notre serveur
const server = http.createServer((req, res) => {
  console.log("request received");
});

// permet a notre server de ce mettre en mode ecoute sur le port specifié
// localhost est le nom de notre hote (on specifie localhost pr que notre pc fasse office de serveur) 127.0.0.1
// la callback fonction est declanché quand le serveur commence a écouter
server.listen(3000, "localhost", () => {
  console.log("my server start listening");
});
