'use strict';

const conf = {
  Provider: {
    Slug: "disneyplus",
    Name: "Disney+",
    URL: "https://www.disneyplus.com"
  },
  url: `https://disney.content.edge.bamgrid.com/svc/content/CuratedSet/version/5.1/region/${process.env.CRAWLER_GEO}/audience/k-false,l-true/maturity/1830/language/en/setId/53adf843-491b-40ae-9b46-bccbceed863b/pageSize/30/page/`,
  seriesUrl: `https://disney.content.edge.bamgrid.com/svc/content/DmcSeriesBundle/version/5.1/region/${process.env.CRAWLER_GEO}/audience/k-false,l-true/maturity/1830/language/en/encodedSeriesId/`,
  query: "INSERT IGNORE INTO Media (`Seen`,`Slug`,`Title`,`Year`,`ReleaseDate`,`Medium`,`Description`,`Link`) VALUES (?,?,?,?,?,?,?,?)",
  headers: {
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36",
    "cookie": "ovvuid=ab8e1abd-5c16-4b6e-b160-24d350a1fc34; s_ecid=MCMID%7C40086332307085544669220936815344688911; loaded_variants_ab8e1abd-5c16-4b6e-b160-24d350a1fc34=%7B%22adobe_id%22%3A%221585540135%7CMCIDTS%7C19151%7CMCMID%7C40086332307085544669220936815344688911%7CMCAID%7CNONE%7CMCOPTOUT-1654625625s%7CNONE%7CvVersion%7C4.4.0%22%2C%22cookieExpiration%22%3A1686154425%2C%22cookiePath%22%3A%22%5C%2F%22%2C%22free_content_hub_cta_web%22%3A%22variation_1%22%2C%22auto_fill_zip%22%3A%22control%22%2C%22pick_a_plan_annual_copy_test%22%3A%22control%22%7D; CBS_COM=NTNCMkM5MzRBNTM0QTkwMTIxNTFGNkZEMDQxOThGNUY6MTY4NjE1NDQzMDE4Mzo0NjY1M2E2MWQxOGE5NjhhNWNhNGJkNjQyZGJjODlmMzozLjA6MA; CBS_U=ge:0|gr:4; cbsiaa=70538981; CBS_ADV_VAL=b; CBS_ADV_SUBSES_VAL=3; ET_CID=undefined; mid=undefined; j=undefined; sfmc_sub=undefined; l=undefined; u=undefined; jb=undefined; AMCVS_10D31225525FF5790A490D4D%40AdobeOrg=1; s_cc=true; ab.storage.deviceId.8cb8412e-2475-416f-b1df-c03199764b1f=%7B%22g%22%3A%2206705ad6-0827-c1bb-77c4-4ef38d1e09e5%22%2C%22c%22%3A1654618422736%2C%22l%22%3A1659294461059%7D; ab.storage.userId.8cb8412e-2475-416f-b1df-c03199764b1f=%7B%22g%22%3A%2250439328%22%2C%22c%22%3A1654618431528%2C%22l%22%3A1659294461060%7D; first_page_today=false; loaded_variants_50439328=%7B%22adobe_id%22%3A%221585540135%7CMCIDTS%7C19204%7CMCMID%7C40086332307085544669220936815344688911%7CMCAID%7CNONE%7CMCOPTOUT-1659301661s%7CNONE%7CvVersion%7C4.4.0%22%2C%22cookieExpiration%22%3A1690830462%2C%22cookiePath%22%3A%22%5C%2F%22%2C%22_web__keep_watching_going_to_showpage%22%3A%22keep_watching_to_showpage%22%7D; OptanonConsent=isGpcEnabled=1&datestamp=Sun+Jul+31+2022+12%3A16%3A10+GMT-0700+(Pacific+Daylight+Time)&version=6.30.0&isIABGlobal=false&hosts=&consentId=9c5e3538-32cb-4a6c-9dad-a6f24c1b5e95&interactionCount=1&landingPath=NotLandingPage&groups=1%3A1%2C2%3A1%2C3%3A1%2C4%3A0%2C5%3A1&AwaitingReconsent=false; ab.storage.sessionId.8cb8412e-2475-416f-b1df-c03199764b1f=%7B%22g%22%3A%224508280e-a988-7f10-8dc4-26c2c27673cc%22%2C%22e%22%3A1659296771046%2C%22c%22%3A1659294461058%2C%22l%22%3A1659294971046%7D; CBS_CP=0; AMCV_10D31225525FF5790A490D4D%40AdobeOrg=1585540135%7CMCIDTS%7C19204%7CMCMID%7C40086332307085544669220936815344688911%7CMCAID%7CNONE%7CMCOPTOUT-1659302173s%7CNONE%7CvVersion%7C4.4.0; prevPageType=movie; utag_main=v_id:01813ef1821a00abe07befdc443004079001e071013c8$_sn:5$_se:15$_ss:0$_st:1659296801525$vapi_domain:paramountplus.com$ses_id:1659294461175%3Bexp-session$_pn:4%3Bexp-session$_prevpage:%2Fmovies%2Fvideo%2FFkxnxnhMs7jp00H4TBQpeqcyhk_VqYz8%2F%3Bexp-1659298601530; s_sq=cnetcbscomsite%3D%2526c.%2526a.%2526activitymap.%2526page%253D%25252Fmovies%25252Fvideo%25252FFkxnxnhMs7jp00H4TBQpeqcyhk_VqYz8%25252F%2526link%253D%25257Ccarousel%25257C%25257C1%25257CAlpha%252520and%252520Omega%25253A%252520Journey%252520to%252520Bear%252520Kingdom%25257C%25257C%25257C%25257C%25257C%25257C%25257C%25257C%25257C%25257C%25257C%25257C%2526region%253Dmovies%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c%2526pid%253D%25252Fmovies%25252Fvideo%25252FFkxnxnhMs7jp00H4TBQpeqcyhk_VqYz8%25252F%2526pidt%253D1%2526oid%253Dhttps%25253A%25252F%25252Fwww.paramountplus.com%25252Fmovies%25252Fvideo%25252FLhlQu4NNfctNy4Qgte1dkAGw1RR1DDX1%25252F%2526ot%253DA",
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

let addEpisode = async function(episode, parent, series) {

  let e = {
    Title: episode.text.title.full.program.default.content,
    Medium: "tvEpisode",
    Year: episode.releases[0].releaseYear,
    ReleaseDate: episode.releases[0].releaseDate,
    Season: episode.seasonSequenceNumber,
    Episode: episode.episodeSequenceNumber,
    Parent: parent,
    Description: episode.text.description.full.program.default.content,
    Link: `https://www.disneyplus.com/video/${episode.contentId}`,
  }
  e.Slug  = `${e.Year}-${e.Title}`.trim().toLowerCase().replaceAll(' ', '-').replaceAll('--','-').replace(/[^a-z0-9-]/gi, '');
  e.Image = `media/tv/${series.Slug}/${e.Slug}.jpg`;

  // Try to get known key for thumbnail, fallback to any key.
  let MediaURL = false;
  if(_.has(episode.image.thumbnail, "1.78")) {
    MediaURL = episode.image.thumbnail["1.78"].program.default.url;
  } else {
    let imageKey = _.keys(episode.image.thumbnail);
    MediaURL = episode.image.thumbnail[imageKey[0]].program.default.url;
  }

  console.log(`Episode: ${e.Title}`);
  
  let [rows, fields] = await connection.execute("SELECT * FROM Media WHERE Season = ? AND Episode = ? AND Parent = ? AND Slug = ? LIMIT 1", [ e.Season, e.Episode, parent, e.Slug ]);
  if(rows.length > 0) {

    console.log("Exists");
    return;

  } else {

    try {

      // Retrieve Series Media
      let seriesMedia = {}
      seriesMedia.req = await fetch(MediaURL, {
        method: 'get',
        headers: conf.headers,
      });
      seriesMedia.reqBinary = await seriesMedia.req.arrayBuffer();

      // Send media to S3
      const putSeriesMedia = new s3.PutObjectCommand({ 
        Acl: "public-read",
        Bucket: conf.s3Bucket,
        Body: seriesMedia.reqBinary,
        CacheControl: "public, max-age=86400",
        ContentType: "image/jpeg",
        Key: e.Image,
        StorageClass: "STANDARD"
      });
      await s3client.send(putSeriesMedia);

      let q = connection.format("INSERT INTO Media SET ?", [ e ]);
      let [rows, fields] = await connection.execute(q);

      let query = "INSERT IGNORE INTO ProviderRelationship (`Provider`,`Media`,`Country`,`Link`) VALUES (?,?,?,?)";
      await connection.execute(query, [ ProviderID, rows.insertId, CountryCode, e.Link ]);

      console.log(`Episode added to database.`);

    } catch(e) {
      console.log("Error adding episode", e);
    } 

  }

  return;

}

let findContent = async function() {

  for(let i = 1; true; i++) {

    console.log("Starting Content Scan");

    let url = `${conf.url}${i}`;

    console.log("Scanning URL: %s", url);

    let resp = await fetch(url, {
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET"
    });

    let data = await resp.json();

    // Nothing left to scan
    if(data.data.CuratedSet.items.length < 1 )
      break;

    for (const e of data.data.CuratedSet.items) {

      try {

        let series = {
          Title: e.text.title.full.series.default.content,
          Year: e.releases[0].releaseYear,
          ReleaseDate: e.releases[0].releaseDate,
          Slug: `${e.releases[0].releaseYear}-${e.text.title.full.series.default.content}`.trim().toLowerCase().replaceAll(' ', '-').replaceAll('--','-').replace(/[^a-z0-9-]/gi, ''),
          Link: `https://www.disneyplus.com/series/${e.text.title.slug.series.default.content}/${e.encodedSeriesId}`,
          Medium: "tvSeries"
        }

        series.Image = `media/tv/${series.Slug}.jpg`;

        console.log("SERIES META LINK", `${conf.seriesUrl}${e.encodedSeriesId}`);

        // Retrieve Series Metadata
        let req = await fetch(`${conf.seriesUrl}${e.encodedSeriesId}`, {
          method: 'get',
          headers: conf.headers,
        });
        const seriesMeta = await req.json();
        series.Description = seriesMeta.data.DmcSeriesBundle.series.text.description.full.series.default.content;

        console.log(`--- SERIES ---`);
        console.log(`Title: ${series.Title}`);

        // Check to see if content already exists in database.
        let SeriesID;
        let [rows, fields] = await connection.execute("SELECT * FROM Media WHERE Slug = ? LIMIT 1", [ series.Slug ]);

        if(rows.length > 0) {

          SeriesID = rows[0].Id;
          console.log("Series Already Exists, ID %d", SeriesID);

        } else {

          // Retrive Movie Page for Image & Description
          let req = await fetch(series.Link, {
            method: 'get',
            headers: conf.headers,
          });
          const reqMedia = await req.text();
          let $ = cheerio.load(reqMedia);
          let seriesImage = $("[property=og:image]").attr("content");

          // Retrieve Series Media
          let seriesMedia = {}
          seriesMedia.req = await fetch(seriesImage, {
            method: 'get',
            headers: conf.headers,
          });
          seriesMedia.reqBinary = await seriesMedia.req.arrayBuffer();

          // Send media to S3
          const putSeriesMedia = new s3.PutObjectCommand({ 
            Acl: "public-read",
            Bucket: conf.s3Bucket,
            Body: seriesMedia.reqBinary,
            CacheControl: "public, max-age=86400",
            ContentType: "image/jpeg",
            Key: series.Image,
            StorageClass: "STANDARD"
          });
          await s3client.send(putSeriesMedia);

          let q = connection.format("INSERT INTO Media SET ?", [ series ]);
          let [rows, fields] = await connection.execute(q);

          SeriesID = rows.insertId;

          let query = "INSERT IGNORE INTO ProviderRelationship (`Provider`,`Media`,`Country`,`Link`) VALUES (?,?,?,?)";
          await connection.execute(query, [ ProviderID, SeriesID, CountryCode, series.Link ]);

        }

        // https://disney.content.edge.bamgrid.com/svc/content/DmcEpisodes/version/5.1/region/US/audience/k-false,l-true/maturity/1830/language/en/seasonId/d4da4897-693d-464a-bec6-46c52874a5cb/pageSize/60/page/1

        // Send through Season 1 episodes
        for (const season of seriesMeta.data.DmcSeriesBundle.seasons.seasons) {

          let seasonLink = `https://disney.content.edge.bamgrid.com/svc/content/DmcEpisodes/version/5.1/region/${process.env.CRAWLER_GEO}/audience/k-false,l-true/maturity/1830/language/en/seasonId/${season.seasonId}/pageSize/60/page/1`;

          console.log(`Season Link: ${seasonLink}`);

          let req = await fetch(seasonLink, {
            method: 'get',
            headers: conf.headers,
          });
          const reqSeason = await req.json();

          for (const episode of reqSeason.data.DmcEpisodes.videos) {
            await addEpisode(episode, SeriesID, series);
          }

        }

      } catch(e) {

        console.log("Unable to process series.", e);

      }

    }

  }

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