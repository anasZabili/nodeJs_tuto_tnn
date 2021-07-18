const fs = require("fs");

// read files
// read file with fs
fs.readFile("./file.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data);
});

console.log("hello world from node");

// write file with fs
fs.writeFile("./file.txt", "hello world from my program", "utf8", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("file was successfully written");
  }
});

// make directory with fs
if (!fs.existsSync("./test")) {
  fs.mkdir("./test", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("directory was successfully created");
    }
  });
} else {
  fs.rmdir("./test", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("directory was successfully deleted");
    }
  });
}

// delete file with fs
if (fs.existsSync("./file2.txt")) {
  fs.unlink("./file2.txt", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("file was successfully deleted");
    }
  });
}

// stream allow us to read the data before its done reading
