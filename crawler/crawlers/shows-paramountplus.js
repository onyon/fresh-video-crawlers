import Crawler from "./crawler.class.js";

import cheerio  from "cheerio";
import _        from "underscore";
import moment   from "moment";

export default class ParamountPlus extends Crawler {

  async crawl() {

    this.local = {
      link: {
        index: `https://www.paramountplus.com/shows_xhr/all/`,
      }
    }

    this.setHeaders({
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "cookie": "ovvuid=ab8e1abd-5c16-4b6e-b160-24d350a1fc34; s_ecid=MCMID%7C40086332307085544669220936815344688911; loaded_variants_ab8e1abd-5c16-4b6e-b160-24d350a1fc34=%7B%22adobe_id%22%3A%221585540135%7CMCIDTS%7C19151%7CMCMID%7C40086332307085544669220936815344688911%7CMCAID%7CNONE%7CMCOPTOUT-1654625625s%7CNONE%7CvVersion%7C4.4.0%22%2C%22cookieExpiration%22%3A1686154425%2C%22cookiePath%22%3A%22%5C%2F%22%2C%22free_content_hub_cta_web%22%3A%22variation_1%22%2C%22auto_fill_zip%22%3A%22control%22%2C%22pick_a_plan_annual_copy_test%22%3A%22control%22%7D; CBS_COM=NTNCMkM5MzRBNTM0QTkwMTIxNTFGNkZEMDQxOThGNUY6MTY4NjE1NDQzMDE4Mzo0NjY1M2E2MWQxOGE5NjhhNWNhNGJkNjQyZGJjODlmMzozLjA6MA; CBS_U=ge:0|gr:4; cbsiaa=70538981; CBS_ADV_VAL=b; CBS_ADV_SUBSES_VAL=3; ET_CID=undefined; mid=undefined; j=undefined; sfmc_sub=undefined; l=undefined; u=undefined; jb=undefined; AMCVS_10D31225525FF5790A490D4D%40AdobeOrg=1; s_cc=true; ab.storage.deviceId.8cb8412e-2475-416f-b1df-c03199764b1f=%7B%22g%22%3A%2206705ad6-0827-c1bb-77c4-4ef38d1e09e5%22%2C%22c%22%3A1654618422736%2C%22l%22%3A1659294461059%7D; ab.storage.userId.8cb8412e-2475-416f-b1df-c03199764b1f=%7B%22g%22%3A%2250439328%22%2C%22c%22%3A1654618431528%2C%22l%22%3A1659294461060%7D; first_page_today=false; loaded_variants_50439328=%7B%22adobe_id%22%3A%221585540135%7CMCIDTS%7C19204%7CMCMID%7C40086332307085544669220936815344688911%7CMCAID%7CNONE%7CMCOPTOUT-1659301661s%7CNONE%7CvVersion%7C4.4.0%22%2C%22cookieExpiration%22%3A1690830462%2C%22cookiePath%22%3A%22%5C%2F%22%2C%22_web__keep_watching_going_to_showpage%22%3A%22keep_watching_to_showpage%22%7D; OptanonConsent=isGpcEnabled=1&datestamp=Sun+Jul+31+2022+12%3A16%3A10+GMT-0700+(Pacific+Daylight+Time)&version=6.30.0&isIABGlobal=false&hosts=&consentId=9c5e3538-32cb-4a6c-9dad-a6f24c1b5e95&interactionCount=1&landingPath=NotLandingPage&groups=1%3A1%2C2%3A1%2C3%3A1%2C4%3A0%2C5%3A1&AwaitingReconsent=false; ab.storage.sessionId.8cb8412e-2475-416f-b1df-c03199764b1f=%7B%22g%22%3A%224508280e-a988-7f10-8dc4-26c2c27673cc%22%2C%22e%22%3A1659296771046%2C%22c%22%3A1659294461058%2C%22l%22%3A1659294971046%7D; CBS_CP=0; AMCV_10D31225525FF5790A490D4D%40AdobeOrg=1585540135%7CMCIDTS%7C19204%7CMCMID%7C40086332307085544669220936815344688911%7CMCAID%7CNONE%7CMCOPTOUT-1659302173s%7CNONE%7CvVersion%7C4.4.0; prevPageType=movie; utag_main=v_id:01813ef1821a00abe07befdc443004079001e071013c8$_sn:5$_se:15$_ss:0$_st:1659296801525$vapi_domain:paramountplus.com$ses_id:1659294461175%3Bexp-session$_pn:4%3Bexp-session$_prevpage:%2Fmovies%2Fvideo%2FFkxnxnhMs7jp00H4TBQpeqcyhk_VqYz8%2F%3Bexp-1659298601530; s_sq=cnetcbscomsite%3D%2526c.%2526a.%2526activitymap.%2526page%253D%25252Fmovies%25252Fvideo%25252FFkxnxnhMs7jp00H4TBQpeqcyhk_VqYz8%25252F%2526link%253D%25257Ccarousel%25257C%25257C1%25257CAlpha%252520and%252520Omega%25253A%252520Journey%252520to%252520Bear%252520Kingdom%25257C%25257C%25257C%25257C%25257C%25257C%25257C%25257C%25257C%25257C%25257C%25257C%2526region%253Dmovies%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c%2526pid%253D%25252Fmovies%25252Fvideo%25252FFkxnxnhMs7jp00H4TBQpeqcyhk_VqYz8%25252F%2526pidt%253D1%2526oid%253Dhttps%25253A%25252F%25252Fwww.paramountplus.com%25252Fmovies%25252Fvideo%25252FLhlQu4NNfctNy4Qgte1dkAGw1RR1DDX1%25252F%2526ot%253DA",
    });

    const index = await this.getJSON(this.local.link.index);

    // Merge all episode lists into single list
    let episodes = [];
    for (const i of index.result.data) {
      for (const s of i.result.data) {
        episodes.push(s);
      }
    }

    for (const e of episodes) {

      const showHTML = await this.getHTML(`${this.app.Provider.Link}${e.href}`);
      const regex       = /\<script type=\"application\/ld\+json\"\>(.+)\<\/script\>/gm;
      const showMeta  = JSON.parse(regex.exec(showHTML)[1]);

      // Validate we are a TV series and not a live event.
      if(!_.has(showMeta, "containsSeason")) {
        console.log("Not a TV series, continuing");
        continue;
      }

      // Load DOM to grep for necessary meta
      const $ = cheerio.load(showHTML);

      let show = {
        Title:        e.title.trim(),
        Description:  $('#hero-description').text().trim(),
        Year:         $('.showBadging div div:nth-child(2)').text().trim(),
        ReleaseDate:  `${$('.showBadging div div:nth-child(2)').text().trim()}-01-01`,
        Link:         `${this.app.Provider.Link}${e.href}`,
      }

      show.RetrieveImage = async function(self) {

        return await self.getBuffer(e.thumb);

      }

      show = await this.addShow(show);

      // Iterate over seasons
      for (const season of $('#season_filterDD li').map((i, x) => $(x).attr("aria-label")).toArray()) {

        const regex     = /Season (\d+)/gm;
        const seasonMeta = await this.getJSON(`${show.Link}xhr/episodes/page/0/size/18/xs/0/season/${regex.exec(season)[1]}/`);

        for (const ep of seasonMeta.result.data) {

          let episode = {
            Title: ep.label,
            Link: `${this.app.Provider.Link}${ep.url}`,
            Year: moment(ep.airdate_iso).format('YYYY'),
            ReleaseDate: moment(ep.airdate_iso).format("YYYY-MM-DD"),
            Season: ep.season_number,
            Episode: ep.episode_number,
            Parent: show.Id,
            Description: async function(self) {

              const $ = cheerio.load(await self.getHTML(this.Link));
              return $("[property=og:description]").attr('content');

            },
            RetrieveImage: async function(self) {

              const img = !_.isNull(ep.thumb.large) ? ep.thumb.large : ep.thumbUrl;
              return self.getBuffer(img);

            }
          }

          await this.addEpisode(episode);

        }

      }


    }

  }

}