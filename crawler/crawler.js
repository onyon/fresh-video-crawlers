'use strict';

// We are going to attach all the functionality to app
// and pass it into the individual crawlers on execution.
import config from "./config.js";
import fs from "fs";

let app = {
  config: config()
};

// Validate GEO is Sane
if(app.config.Country.Code.length !== 2) {
  console.error("Invalid Country Code, expecting 2 characters.");
  process.exit(1);
}

// Validate Provider Input Exists
if(!_.has(app.config.Provider, process.env.CRAWLER_PROVIDER)) {
  console.error("Provider %s not found.", process.env.CRAWLER_PROVIDER);
  process.exit(1);
}

// Validate Crawler Exists, done in init script but for safety sake.
if(!fs.existsSync(app.config.CrawlScript)) {
  console.error("Crawl Script %s not found.", app.config.CrawlScript);
  process.exit(1);
}

// Assign Provider Shortcut
app.Provider = app.config.Provider[process.env.CRAWLER_PROVIDER];

import mysql from "mysql2/promise";
import _     from "underscore";

// Create Database Connection
console.info("Connecting to Database. %s:*****@%s/%s",
  app.config.Database.user,
  app.config.Database.password,
  app.config.Database.database);

app.db = await mysql.createConnection(app.config.Database);

console.info("Connected to Database.");

// Attach Provider Id to app.Provider.
let [rows, fields] = await app.db.execute("SELECT * FROM Provider WHERE Slug = ? LIMIT 1", [ app.Provider.Slug ]);

// Provider Does Not Exist
if (rows.length < 1) {

  console.info("Provider does not exist, creating it.");
  [rows, fields] = await app.db.execute(app.db.format("INSERT INTO Provider SET ?", [ app.Provider ]));
  app.Provider.Id = rows.insertId;
  console.info("Provider created, ID %s.", app.Provider.Id);

// Provider Exists
} else { 

  app.Provider.Id = rows[0].Id;
  console.info("Provider found, ID %s.", app.Provider.Id);

}

import CrawlerMoviesDisneyPlus    from "./crawlers/movies-disneyplus.js";
import CrawlerShowsDisneyPlus     from "./crawlers/shows-disneyplus.js";

import CrawlerShowsPeacockTV from './crawlers/shows-peacocktv.js';

import CrawlerMoviesParamountPlus from './crawlers/movies-paramountplus.js';
import CrawlerShowsParamountPlus  from './crawlers/shows-paramountplus.js';

switch(app.config.Crawler) {
  case "movies-disneyplus.js":
    await new CrawlerMoviesDisneyPlus(app).crawl();
    break;
  case "shows-disneyplus.js":
    await new CrawlerShowsDisneyPlus(app).crawl();
    break;
  case "shows-peacocktv.js":
    await new CrawlerShowsPeacockTV(app).crawl();
    break;
  case "shows-paramountplus.js":
    await new CrawlerShowsParamountPlus(app).crawl();
    break;
    case "movies-paramountplus.js":
      await new CrawlerMoviesParamountPlus(app).crawl();
      break;
}

console.info("Crawl Complete, exiting.");
process.exit();