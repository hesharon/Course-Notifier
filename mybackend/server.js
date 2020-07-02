const express = require("express");
const app = express();
const port = 5000;
const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");

app.get("/scraper", async function (req, res) {
  var json = [
    { course_name: "", status: "" },
    { course_name: "", status: "" },
    { course_name: "", status: "" },
  ];
  const CPSC320 =
    "https://courses.students.ubc.ca/cs/courseschedule?tname=subj-course&course=320&sessyr=2020&sesscd=S&dept=CPSC&pname=subjarea";
  const CPSC340 =
    "https://courses.students.ubc.ca/cs/courseschedule?tname=subj-course&course=340&sessyr=2020&sesscd=S&dept=CPSC&pname=subjarea";
  const CPSC304 =
    "https://courses.students.ubc.ca/cs/courseschedule?sesscd=S&pname=subjarea&tname=subj-course&sessyr=2020&course=304&dept=CPSC";

  request(CPSC304, async (error, response, html) => {
    if (!error && response.statusCode == 200) {
      var course_name, status;
      const $ = cheerio.load(html);

      status = $(
        "body > div.container > div.content.expand > table.table.table-striped.section-summary > tbody > tr:nth-child(1) > td:nth-child(1)"
      ).text();

      course_name = $(
        "body > div.container > div.content.expand > table.table.table-striped.section-summary > tbody > tr:nth-child(1) > td:nth-child(2) > a"
      ).text();

      json[0].course_name = course_name;
      json[0].status = status;

      fs.writeFile("output.json", JSON.stringify(json, null, 4), function (
        err
      ) {
        console.log(
          "File successfully written! - Check your project directory for the output.json file"
        );
      });
    }
  });

  await request(CPSC320, async (error, response, html) => {
    if (!error && response.statusCode == 200) {
      var course_name, status;
      const $ = cheerio.load(html);

      status = $(
        "body > div.container > div.content.expand > table.table.table-striped.section-summary > tbody > tr:nth-child(1) > td:nth-child(1)"
      ).text();

      course_name = $(
        "body > div.container > div.content.expand > table.table.table-striped.section-summary > tbody > tr:nth-child(1) > td:nth-child(2) > a"
      ).text();

      json[1].course_name = course_name;
      json[1].status = status;

      fs.writeFile("output.json", JSON.stringify(json, null, 4), function (
        err
      ) {
        console.log(
          "File successfully written! - Check your project directory for the output.json file"
        );
      });
    }
  });

  await request(CPSC340, async (error, response, html) => {
    if (!error && response.statusCode == 200) {
      var course_name, status;
      const $ = cheerio.load(html);

      status = $(
        "body > div.container > div.content.expand > table.table.table-striped.section-summary > tbody > tr:nth-child(1) > td:nth-child(1)"
      ).text();

      course_name = $(
        "body > div.container > div.content.expand > table.table.table-striped.section-summary > tbody > tr:nth-child(1) > td:nth-child(2) > a"
      ).text();

      json[2].course_name = course_name;
      json[2].status = status;

      fs.writeFile("output.json", JSON.stringify(json, null, 4), function (
        err
      ) {
        console.log(
          "File successfully written! - Check your project directory for the output.json file"
        );
      });
      res.send(json);
    }
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
