import fsPromises from "fs/promises";
import fetch from "node-fetch";
import fs from "fs";

const filename = "book.json";
const HTMLfile = "book.html"

var offset = 0;
var limit = 50;

async function writeToFile(book) {
  console.log(`Writing to ${filename}`);
  await fsPromises.writeFile(filename, JSON.stringify(book), "utf-8");
}

async function fetchingDataFromWebsite() {
  const response = await fetch(
    `https://librivox.org/api/feed/audiobooks?format=json&offset=${offset}&limit=${limit}`
  ).catch((err) => {
    return console.log(err);
  });
  console.log("Fetching the data from website");
  console.log(`https://librivox.org/api/feed/audiobooks?format=json&offset=${offset}&limit=${limit}`)
  console.log(`Reponse status: ${response.status}`);
  return await response.json();
}

async function checkFileExist() {
  if (!fs.existsSync(filename)) {
    while (true) {
      const book = await fetchingDataFromWebsite();
      if (book.error === "Audiobooks could not be found") break;
      console.log(book);
      console.log(book.error === "Audiobooks could not be found");
      offset += 50;
      limit += 50;
      await writeToFile(book);
    }
  } else {
    console.log(`File exist ${filename}`);
  }
  return true;
}

async function getAllBook() {
  if (await checkFileExist()) {
    fs.readFile("book.json", "utf8", function (err, data) {
      if (err) return console.log(err);
      const dataFromFileJSON = JSON.parse(data);
      console.log(dataFromFileJSON);
      // for (let i = 0; i < dataFromFileJSON.books.length; i++) {
      //   console.log(dataFromFileJSON.books[i].title);
      // }
    });
  }
}

getAllBook();
