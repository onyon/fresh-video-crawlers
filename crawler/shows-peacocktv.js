'use strict';

const conf = {
  Provider: {
    Slug: "peackocktv",
    Name: "Peackock",
    URL: "https://www.peackocktv.com"
  },
  url: "https://web.clients.peacocktv.com/bff/sections/v1?template=sections&segment=First_30_Days_Paid&slug=%2Ftv%2Ftv-shows-all-shows",
  query: "INSERT IGNORE INTO Media (`Seen`,`Slug`,`Title`,`Year`,`ReleaseDate`,`Medium`,`Description`,`Link`) VALUES (?,?,?,?,?,?,?,?)",
  headers: {
    'authority': 'web.clients.peacocktv.com',
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'origin': 'https://www.peacocktv.com',
    'referer': 'https://www.peacocktv.com/',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'sec-gpc': '1',
    'x-skyott-ab-atom': 'aa_web_multiple_concurrent_feature_1_test:variation_1',
    'x-skyott-ab-clip': 'aa_web_multiple_concurrent_feature_1_test:variation_1',
    'x-skyott-device': 'COMPUTER',
    'x-skyott-language': 'en',
    'x-skyott-platform': 'PC',
    'x-skyott-proposition': 'NBCUOTT',
    'x-skyott-provider': 'NBCU',
    'x-skyott-territory': process.env.CRAWLER_GEO,
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36",
  },
  s3Bucket: "torrent-ninja-assets"
}

import fetch    from 'node-fetch';
import mysql    from 'mysql2/promise';
import moment   from "moment";
import _        from "underscore";
import cheerio  from "cheerio";
import s3       from "@aws-sdk/client-s3";

const s3client = new s3.S3Client();

let findContent = async function() {

  console.log("Starting Content Scan");

  let url = `${conf.url}`;

  console.log("Scanning URL: %s", url);

  let resp = await fetch(url, {
    "method": "GET",
    headers: conf.headers,
  });

  let data = await resp.json();

  for (const e of data.data.rail.items) {

    // Fetch the Show JSON
    const params = new URLSearchParams({
      slug: e.slug,
      represent: "(items(items),recs[take=8],collections(items(items[take=8])),trailers)"
    });

    let seriesReq = {};

    seriesReq.fetch = await fetch(`https://atom.peacocktv.com/adapter-calypso/v3/query/node?${params}`, {
      "method": "GET",
      headers: conf.headers,
    });

    seriesReq.data = await seriesReq.fetch.json();

    const seriesMeta = seriesReq.data.attributes;
    const firstEp    = seriesReq.data.relationships.items.data[0].relationships.items.data[0];

    // Setup Series Meta
    let series = {
      Title: seriesMeta.title,
      Description: seriesMeta.synopsisLong,
      Link: `https://www.peacocktv.com/watch/asset${seriesMeta.slug}`,
      Year: firstEp.attributes.year,
      ReleaseDate: `${firstEp.attributes.year}-01-01`,
      Medium: "tvSeries"
    }
    series.Slug = `${series.Year}-${series.Title}`.trim().toLowerCase().replaceAll(' ', '-').replaceAll('--','-').replace(/[^a-z0-9-]/gi, '');

    console.log(`--- SERIES ---`);
    console.log(`Title: ${series.Title}`);
    console.log(`Year: ${series.Year}`);

    // Check to see if content already exists in database.
    let SeriesID;
    let [rows, fields] = await connection.execute("SELECT * FROM Media WHERE Slug = ? LIMIT 1", [ series.Slug ]);

    // Exists, nothing to do.
    if(rows.length > 0) {

      SeriesID = rows[0].Id;
      console.log("Series Already Exists, ID %d", SeriesID);

    // Does not exist, download media & add series to database
    } else {

      let seriesArt = seriesMeta.images.filter(image => image.type == "titleArt169");
      if(seriesArt.length < 1) {
        throw("Unable to find title art key titleArt169.", seriesMeta.images);
      }

      series.Image = `media/tv/${series.Slug}.jpg`;

      // Retrieve Image
      let Media = {}
      Media.req = await fetch(seriesArt[0].url, {
        method: 'get',
        headers: conf.headers,
      });
      Media.reqBinary = await Media.req.arrayBuffer();

      // Load Image to S3
      const putMedia = new s3.PutObjectCommand({ 
        Acl: "public-read",
        Bucket: conf.s3Bucket,
        Body: Media.reqBinary,
        CacheControl: "public, max-age=86400",
        ContentType: "image/jpeg",
        Key: series.Image,
        StorageClass: "STANDARD"
      });
      await s3client.send(putMedia);

      // Add to Database
      let q = connection.format("INSERT INTO Media SET ?", [ series ]);
      [rows, fields] = await connection.execute(q);

      SeriesID = rows.insertId;

      let query = "INSERT IGNORE INTO ProviderRelationship (`Provider`,`Media`,`Country`,`Link`) VALUES (?,?,?,?)";
      await connection.execute(query, [ ProviderID, SeriesID, CountryCode, series.Link ]);

      console.log(" - Series Added to Database");

    }

    for (const ep of seriesReq.data.relationships.items.data[0].relationships.items.data) {

      let episode;

      try {

        episode = {
          Title: _.has(ep.attributes, "title") ? ep.attributes.title : ep.attributes.titleLong,
          Description: ep.attributes.synopsisLong,
          Link: `https://www.peacocktv.com/watch/asset${ep.attributes.slug}`,
          Year: ep.attributes.year,
          ReleaseDate: `${ep.attributes.year}-01-01`,
          Season: ep.attributes.seasonNumber,
          Episode: ep.attributes.episodeNumber,
          Parent: SeriesID,
          Medium: "tvEpisode",
        }

        episode.Slug = `${episode.Year}-${episode.Title}`.trim().toLowerCase().replaceAll(' ', '-').replaceAll('--','-').replace(/[^a-z0-9-]/gi, ''),

        console.log(`Episode Title: ${episode.Title}, Season: ${episode.Season}, Episode: ${episode.Episode}, Parent: ${episode.Parent}`);

        let [rows, fields] = await connection.execute("SELECT * FROM Media WHERE Season = ? AND Episode = ? AND Parent = ? AND Slug = ? LIMIT 1", [ episode.Season, episode.Episode, episode.Parent, episode.Slug ]);
        if(rows.length > 0) {
      
          console.log(" - Exists");
          continue;
      
        }

        const fmtd = {
          season:  episode.Season.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }),
          episode: episode.Episode.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false }),
        };

        episode.Image = `media/tv/${series.Slug}/s${fmtd.season}e${fmtd.episode}-${episode.Slug}.jpg`;

        let episodeArt = ep.attributes.images.filter(image => image.type == "landscape");
        if(episodeArt.length < 1) {
          throw("Unable to find title art key landscape.", ep.attributes.images);
        }

        let episodeMedia = {}
        episodeMedia.req = await fetch(episodeArt[0].url, {
          method: 'get',
          headers: conf.headers,
        });
        episodeMedia.reqBinary = await episodeMedia.req.arrayBuffer();

        // Send media to S3
        const putSeriesMedia = new s3.PutObjectCommand({ 
          Acl: "public-read",
          Bucket: conf.s3Bucket,
          Body: episodeMedia.reqBinary,
          CacheControl: "public, max-age=86400",
          ContentType: "image/jpeg",
          Key: episode.Image,
          StorageClass: "STANDARD"
        });
        await s3client.send(putSeriesMedia);

        let q = connection.format("INSERT INTO Media SET ?", [ episode ]);
        [rows, fields] = await connection.execute(q);

        const EpisodeID = rows.insertId;

        let query = "INSERT IGNORE INTO ProviderRelationship (`Provider`,`Media`,`Country`,`Link`) VALUES (?,?,?,?)";
        await connection.execute(query, [ ProviderID, EpisodeID, CountryCode, episode.Link ]);

        console.log(`- Episode added to database. ID ${EpisodeID}`);
      
      } catch(e) {

        console.log(" - Error Processing Episode", e, episode, ep);

        process.exit();

      }

    }

  }

  process.exit();

}

console.log("Connecting to database. %s:*****@%s/%s", 
  process.env.RDS_USER, 
  process.env.RDS_HOST, 
  process.env.RDS_DB);

const connection = await mysql.createConnection({
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASS,
  database: process.env.RDS_DB
});

console.log("Connected");

console.log("Checking GEO");

let resp = await fetch("https://api.myip.com", { "method": "GET" });

let data = await resp.json();

const CountryCode = data.cc;
console.log("Using Country Code %s", CountryCode);

console.log("Finding Provider Information");

let ProviderID;
let [rows, fields] = await connection.execute("SELECT * FROM Provider WHERE Slug = ? LIMIT 1", [ conf.Provider.Slug ]);
if(rows.length < 1) {
  console.log("Provider not found, creating.");
  [rows, fields] = await connection.execute("INSERT INTO Provider (`Slug`, `Name`, `URL`) VALUES (?,?,?)", [ conf.Provider.Slug, conf.Provider.Name, conf.Provider.URL ]);
  ProviderID = rows.insertId;
} else {
  ProviderID = rows[0].Id;
}

console.log("Using Provider ID %d", ProviderID);

await findContent();