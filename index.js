const puppeteer = require("puppeteer");

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());

app.get("/pdf-demo", async (req, res) => {
  // const sname = req.query.sname;
  // const fname = req.query.fname;

  // Create a browser instance
  const browser = await puppeteer.launch();
  // Create a new page
  const page = await browser.newPage();
  const website_url = `http://127.0.0.1:5173/?search=dee2bff0-a783-11ed-b498-8d6c877714bd`;

  // Open URL in current page
  await page.goto(website_url, { waitUntil: "networkidle0" });
  //To reflect CSS used for screens instead of print
  await page.emulateMediaType("screen");

  // TODO: Handle PDF File in here
  const pdf = await page.pdf({
    path: "result.pdf",
    printBackground: true,
    format: "A3",
  });

  // Close the browser instance
  await browser.close().then(() => console.log("Done"));

  await res.json({
    status: "Ok",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
