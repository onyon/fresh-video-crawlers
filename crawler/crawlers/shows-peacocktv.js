import Crawler from "./crawler.class.js";

import _        from "underscore";

export default class PeacockTV extends Crawler {

  async crawl() {

    this.local = {
      link: {
        index: `https://web.clients.peacocktv.com/bff/sections/v1?template=sections&segment=First_30_Days_Paid&slug=%2Ftv%2Ftv-shows-all-shows`,
        series: `https://atom.peacocktv.com/adapter-calypso/v3/query/node?`
      }
    }

    this.setHeaders({
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
    });

    const index = await this.getJSON(this.local.link.index);

    for (const e of index.data.rail.items) {

      // Retrieve Show Meta
      const params = new URLSearchParams({
        slug: e.slug,
        represent: "(items(items),recs[take=8],collections(items(items[take=8])),trailers)"
      });
      const showJSON = await this.getJSON(`${this.local.link.series}${params}`);

      const showMeta = showJSON.attributes;
      const firstEp  = showJSON.relationships.items.data[0].relationships.items.data[0];

      let show = {
        Title: showMeta.title,
        Description: showMeta.synopsisLong,
        Link: `https://www.peacocktv.com/watch/asset${showMeta.slug}`,
        Year: firstEp.attributes.year,
        ReleaseDate: `${firstEp.attributes.year}-01-01`,
      }

      show.RetrieveImage = async function(self) {

        const seriesArt = showMeta.images.filter(image => image.type == "titleArt169");
        return await self.getBuffer(seriesArt[0].url);

      }

      show = await this.addShow(show);

      for (const ep of showJSON.relationships.items.data[0].relationships.items.data) {

        let episode = {
          Title: _.has(ep.attributes, "title") ? ep.attributes.title : ep.attributes.titleLong,
          Description: ep.attributes.synopsisLong,
          Link: `https://www.peacocktv.com/watch/asset${ep.attributes.slug}`,
          Year: ep.attributes.year,
          ReleaseDate: `${ep.attributes.year}-01-01`,
          Season: ep.attributes.seasonNumber,
          Episode: ep.attributes.episodeNumber,
          Parent: show.Id,
        }

        episode.RetrieveImage = async function(self) {

          let episodeArt = ep.attributes.images.filter(image => image.type == "landscape");
          return await self.getBuffer(episodeArt[0].url);
  
        }

        await this.addEpisode(episode);

      }

    }

  }

}