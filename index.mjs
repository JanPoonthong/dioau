import fetch from "node-fetch";
import fs from "fs";

const filename = "book.json";

function readData() {
  fs.readFile("book.json", "utf8", function (err, data) {
    if (err) return console.log(err);
    console.log(data);
  });
}

function writeToFile(book) {
  fs.writeFile(filename, JSON.stringify(book), (err) => {
    if (err) return console.log(err);
    console.log(`File created ${filename}`);
  });
}

async function fetchingDataFromWebsite() {
  const response = await fetch(
    "https://librivox.org/api/feed/audiobooks?extended=1&format=json"
  ).catch((err) => {
    return console.log(err);
  });
  console.log("Fethcing the data from website");
  return await response.json();
}

async function checkFileExist() {
  if (!fs.existsSync(filename)) {
    const book = await fetchingDataFromWebsite();
    writeToFile(book);
  } else {
    console.log(`File exist ${filename}`);
  }
  return true;
}

function getAllBook() {
  if (checkFileExist()) {
    readData();
  }
}

getAllBook();
