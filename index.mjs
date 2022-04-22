import fetch from "node-fetch";
import fs from "fs";

async function getAllBook() {
  const response = await fetch('https://librivox.org/api/feed/audiobooks?extended=1&format=json');
  return await response.json();
}

getAllBook().then((book) => {
  fs.writeFile("book.json", JSON.stringify(book), (err) => {
    if (err) return console.log(err);
    console.log("Successful");
  });
})
