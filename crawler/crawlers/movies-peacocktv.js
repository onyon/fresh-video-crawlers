import Crawler from "./crawler.class.js";

import _        from "underscore";

export default class PeacockTV extends Crawler {

  async crawl() {

    // Local Variables
    this.local = {
      link: {
        index: `https://atom.peacocktv.com/adapter-calypso/v3/query/node?represent=(items)&slug=%2Fmovies%2Fa-z`,
      }
    }

    // Set Default Headers
    this.setHeaders({
      'authority': 'atom.peacocktv.com',
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.9',
      'origin': 'https://www.peacocktv.com',
      'referer': 'https://www.peacocktv.com/',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'sec-gpc': '1',
      'x-skyott-application': 'ott-sas-iceberg-peacock',
      'x-skyott-device': 'COMPUTER',
      'x-skyott-language': 'en',
      'x-skyott-platform': 'PC',
      'x-skyott-proposition': 'NBCUOTT',
      'x-skyott-provider': 'NBCU',
      'x-skyott-territory': 'US',
    });

    const index = await this.getJSON(this.local.link.index);

    for(const e of index.relationships.items.data) {

      try {

        let movie = {
          Title: e.attributes.title,
          Description: e.attributes.synopsisLong,
          Link: `https://www.peacocktv.com/watch/asset${e.attributes.slug}`,
          Year: e.attributes.year,
          ReleaseDate: `${e.attributes.year}-01-01`, // TODO: Fix Release Date
          RetrieveImage: async function(self) {

            let res = e.attributes.images.filter(image => image.type == "titleArt34");
            return await self.getBuffer(res[0].url);

          }
        }

        await this.addMovie(movie);

      } catch(err) {

        console.error("Error Adding Movie", err);

      }

    }

  }

}