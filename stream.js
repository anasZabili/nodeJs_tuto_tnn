const fs = require("fs");

const readStream = fs.createReadStream("./blog3.txt", { encoding: "utf8" });

// create write stream

const writeStream = fs.createWriteStream("./blog4.txt", { encoding: "utf8" });

// is tregger every time a new chunk is recived²
// readStream.on("data", (chunk) => {
//   console.log("new chunk received");
//   writeStream.write(chunk + "\r\n");
// });

// pinping

readStream.pipe(writeStream);
