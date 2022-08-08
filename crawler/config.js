export default function cfg() {
  return({
    Provider: {
      disneyplus: {
        Name: "Disney+",
        Slug: "disneyplus",
        Link: "https://www.disneyplus.com",
      },
      peacocktv: {
        Name: "Peacock",
        Slug: "peacocktv",
        Link: "https://www.peacocktv.com",
      },
      paramountplus: {
        Name: "Paramount+",
        Slug: "paramountplus",
        Link: "https://www.paramountplus.com",
      },
      hulu: {
        Name: "Hulu",
        Slug: "hulu",
        Link: "https://www.hulu.com",
      },
      netflix: {
        Name: "Netflix",
        Slug: "Netflix",
        Link: "https://www.netflix.com",
      },
      hbomax: {
        Name: "HBO Max",
        Slug: "hbomax",
        Link: "https://www.hbomax.com",
      },
      showtime: {
        Name: "Showtime",
        Slug: "showtime",
        Link: "https://www.showtime.com",
      },
      boomerang: {
        Name: "Boomerang",
        Slug: "boomerang",
        Link: "https://www.boomerang.com",
      },
      discoveryplus: {
        Name: "Discovery+",
        Slug: "discoveryplus",
        Link: "https://www.discoveryplus.com",
      },
      funimation: {
        Name: "Funimation",
        Slug: "funimation",
        Link: "https://www.funimation.com",
      },
      crunchyroll: {
        Name: "Crunchyroll",
        Slug: "crunchyroll",
        Link: "https://www.crunchyroll.com",
      },
      plutotv: {
        Name: "PlutoTV",
        Slug: "plutotv",
        Link: "https://www.pluto.tv",
      },
      appletv: {
        Name: "AppleTV+",
        Slug: "appletvplus",
        Link: "https://tv.apple.com",
      }
    },
    Browser: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36"
    },
    Country: {
      Code: process.env.CRAWLER_GEO,
    },
    Database: {
      host: process.env.RDS_HOST,
      user: process.env.RDS_USER,
      password: process.env.RDS_PASS,
      database: process.env.RDS_DB,
    }
  });
}