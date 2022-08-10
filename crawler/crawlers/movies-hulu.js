import Crawler from "./crawler.class.js";

import _        from "underscore";
import moment   from "moment";

export default class DisneyPlus extends Crawler {

  async crawl() {

    // &limit=60&offset=60

    this.local = {
      collections: [
        "https://discover.hulu.com/content/v5/view_hubs/action-movies/collections/4700",
        "https://discover.hulu.com/content/v5/view_hubs/adventure-movies/collection/4705",
        "https://discover.hulu.com/content/v5/view_hubs/anime-movies/collection/4710",
        "https://discover.hulu.com/content/v5/view_hubs/black-stories-movies/collection/4715",
        "https://discover.hulu.com/content/v5/view_hubs/classics-movies/collection/4720",
        "https://discover.hulu.com/content/v5/view_hubs/comedy-movies/collection/4725",
        "https://discover.hulu.com/content/v5/view_hubs/crime-movies/collection/4730",
        "https://discover.hulu.com/content/v5/view_hubs/documentaries-movies/collection/4735",
        "https://discover.hulu.com/content/v5/view_hubs/drama-movies/collection/4740",
        "https://discover.hulu.com/content/v5/view_hubs/action-movies/collections/4700",
        "https://discover.hulu.com/content/v5/view_hubs/action-movies/collections/4700",
        "https://discover.hulu.com/content/v5/view_hubs/action-movies/collections/4700",

      ],
      Link: {
        collection: "https://discover.hulu.com/content/v5/view_hubs/collections/collections/"
      },
      defaultQuery: {
        schema: 1,
        device_info: "web:3.47.0",
        referralHost: "production",
      },
      limit: 120
    }

    this.setHeaders({
      'authority': 'discover.hulu.com',
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'cookie': '_h_csrf_id=fd5398ae1b73bb50d0956b7d3222e74131d88ead237c1d8cbbcc710fa6830258; _hulu_uid=1543507; _hulu_e_id=iY1B5RHDMI_ziUtfcNGjxg; _hulu_bluekai_hashed_uid=86b7054a11db7f3022822582be9b97d8; _hulu_dt=KFxmBmSqASV8%2Fl5qnGCily5hdIs-kUNcxESHz6x_T1xEDrh4Wg--C7_JqSQSBLBxIkQHQBD%2FDsdO2fqi0AfYb6D5OpQdbWkigQiV4kpQQYXIC_Rss8YnSRrddOfINs577HHX_nLYPBgmfA6Nz9BpHbjnjEvUACu7Rgwwv_qEyjTl0BggbBHLuuneLEkXE82y__IzubDnE1jesKA16VRDd2f1TmvWZPFCcGGGK4fimAMt6KczVGuyqFe9ajABf1c4TQ0JWxAyEH2oPLngkWjLSphpWE2iILO4YcGyLNhsG8sSH27PhMhqaqAfmryq_rZfAP1YD54oRr7k94taHGBZP1uxZECsmOkI6WShNf43pMsMa%2FSAUEGo4PDPJdEYT8eHi86Jsg9EW5j1dDUcsWL65EEJqYAzCLw_syMEF9EzkuNaxAHfaEflswMZb10YWbiYWeOK5t1PQjOjfplKQ8huK4AwJzij4luGKZRw%2F6cfM6M6Xp0QiqEosBe_D6pXBNIx%2FnCu3Smg6OJpRskCr0E_T_s3AhVRdK7aiT2By9CSQFZAynLyjl8gNAUgQHoZv4wideDj3ZjZ2_S0cr6LIeVE4eh%2FjY78m5a5IZIh75jJm14IygvMp60Vb7oUBQV9vRyV2CRzV%2FHwLHh9ZqGVZLNpksFunHHQyAfY%2FZ2FS4COeC%2FxxHQY7JEEW3myBf0b7Op5ercthnJbNdPoWo1DEVT4QHy8M7m9SsXtyOLA3ZoeoMKAhsksOptaibxb%2F97XIh0qA5X8BqdD8tvaBEs4hqs%2FTA7ne1FH5tdbdgk2QsIdjxSMdkDVxEWXpS9AE_LKRMS7mY36bKPGy%2FN9bfQqtn6o%2FPDpoz3jHByEO9tdGAL8saD8MSBZw0Tvs4PAcl9tgzp7sAwncL4QFYFcfQKaFxim1AoehPQ86DbcoKpliLETsRaDgTI7gj_YQOcAx4iEzJfaDNhYPALhGw--; guid=5FDB309D5632BC7884F8F7289A560691; _hulu_plid=3146728; _hulu_pid=1543507; _hulu_pname=Richard; _hulu_is_p_kids=0; _hulu_pprotect=1659308469403; _hulu_assignments=eyJ2MSI6W119; _csrf_id=b82a6617911f2d1ee9d429661b3de1d821fe81a58037bf883a772aaba95884b8; AMCVS_0A19F13A598372E90A495D62%40AdobeOrg=1; _persisted_HEM=cf9cf2aa3ca2c5e374284523bbc370c15740cce9a60a7ae35cc7e69cdcd5ea77; _hulu_pgid=327163907; _tcv=a2f2e64f86a9e6a82b2fba8c4782881ec1b63b98107010e5f01144cfba757a1d; _hulu_hbc=1660094041758; ak_bmsc=03304DBEA502BF47A2DEB26E4C52273E~000000000000000000000000000000~YAAQXOXEF3FnDFyCAQAAJM9QhRDIf8xVMiW0yWl+p3Nc58+vRrLMUd1DAPjESCwJhvQnDaaa8AwLjtAmVscURpmdJ3kA6XaaDxTvVB8rvbHV7TMQy6h40SUv8kyS63AfCIzGhuhw8A1vYOU/cZbBVINWoM4woGFeq0zV28YZ7EPwHRQP8f7XxRHpCKOO6eB8WIOWlmWnjVuEtRsiQluyUt5bVThYJbDKJJ6TYN7xCzjr2FrDbBKDQtn8Jz7/BJuCa/KirMTZ5ltMm+LfxxbQMvQyPGSK3MHehat5kcUJnWCkCutqQSkxcWRiT7/o6zNOo8a7F+jxJTM2ocWT6msA56GkgUSGzEqN7rm/z8rmMzd6KmwercAafQGQ/oI0s2zthGwlUexTteOijE49jY7FgoVfZvI8eBOVx1SaWwW0kQxqFYXCd2RMhNeS/VenKcYi/5YJ7PLs7EbUSe25UAwPvKhl1BbvO32XjHcLpCWKjTP5tA0USzH82w==; XSRF-TOKEN=c1767247-227b-4d89-b337-5c2f22d174c1; _hulu_session=huFkzUSEchUUcdMPyF_HBB9zvcs-VMP7q_KugxdXlDmb5c6qfQ--%2FZzy2uO67Zsar_EwLs0T9xc_WwKlbP7MJ2L6XFqHnAu77tBPrtbdId4TEEF98EUQKaaKdA21aWN5UlzFCAhqyLWLGnBR9zqqQGFE1iT9WoF3UqmVORaZUciYJCEzWc9GsTrtnLca8mpSXnT26yqdVVoX3VLJjHavstiQGiQkxiglXsSw0H8XalBxoGzphk5oDRNvEEbuFx1g4edYvs9a0nDfv7We4972bBbdhMFW%2Fa909gY5H08wrSJxqxJ9TYTyjWPXU5J28WJzhgEBcpCz5Kof%2FD9hmCpWsWgYRbZTjbyNUfzrQm1W0NY3A6Rl4EdxwiSa5xj11YqU%2F0YuXGTRvS1M5anBECORPsoa5BOVQkdbaM1JhloWmCDjiR7xknw2pVn7PDULlxdMvFZv1%2F9ZREW9NkzT38TwCLNc492LyvPMUZsVVTKk76Wf5MjhuB6j2XJPDNATJiwLtZL8V6h38rPbYRriVAQz2aS1ogWsjroN9IQav5cYo7BCeE7LCc%2FfA9zdKE2kIM9kfj3qLUbEX5xHDKLIB1Adh_t6KxGvcrgtwkdVczjU_UyU743cuw8wGrEzPpXYwwvEXHmJpLthnHnASZHoXr1QpPO9oLxMmIuv2RmrF298UUUYldM9fE1VRiw8poTELqiYnrvzoSaxhAYGA9pHd8iHift8oErmuII0aPY_j42FEujKM8y9fHhOSkJmcZTcWtwMDCZ3oPPvN69l%2FnETRVmpuVbGSkmpG0cGRGljuSc3C4JKPWKrs5tqT4CPw5x2m2yEFYpy33QrkglPhxDnB%2FVdGKXzE_Uyar5hamJP_86WPIcM6nsJJnObc2lCVZ2pcGTzLpH3rRzxwyz5InmzU1mgkJYxuaXEH89ZU1uCWNFUMB3QOnS65PEUA6pWKPzPOok7dX9r6XlMvUa0uwggJ7fedDIKD2q3IvuokqOus0XIWfzW7IiDYeTr; AMCV_0A19F13A598372E90A495D62%40AdobeOrg=-408604571%7CMCIDTS%7C19215%7CMCMID%7C65288347719582075090577580083928561924%7CMCAID%7CNONE%7CMCOPTOUT-1660101298s%7CNONE%7CvVersion%7C4.6.0; _hulu_metrics_context_v1_=%7B%22cookie_session_guid%22%3A%220e5773878043c33105f62614059e1aba%22%2C%22referrer_url%22%3A%22%22%2C%22curr_page_uri%22%3A%22urn%3Ahulu%3Acollection%3A4696%23view-all%22%2C%22primary_ref_page_uri%22%3A%22urn%3Ahulu%3Ahub%3Aaction-movies%22%2C%22secondary_ref_page_uri%22%3A%22urn%3Ahulu%3Ahub%3Amovies%22%2C%22curr_page_type%22%3A%22view-all%22%2C%22primary_ref_page_type%22%3A%22action-movies%22%2C%22secondary_ref_page_type%22%3A%22movies%22%2C%22secondary_ref_click%22%3A%22Action%22%2C%22primary_ref_click%22%3A%22View%20All%22%2C%22secondary_ref_collection%22%3A%225509%22%2C%22secondary_ref_collection_source%22%3A%22heimdall%22%7D; utag_main=v_id:01813eef3e3a001ea1fb70f6fa5b04079001c071013c8$_sn:11$_ss:0$_st:1660095898383$dc_visit:1$ses_id:1660094042398%3Bexp-session$_pn:1%3Bexp-session$_prevpage:%2Fhub%2Faction-movies%2Fcollection%2F4696%3Bexp-1660097698402$hhid:367516b30c02966381da87615593bb6f461f1d46d56e96869b58188e853c2951%3Bexp-session$hpid:367516b30c02966381da87615593bb6f461f1d46d56e96869b58188e853c2951%3Bexp-session$k_sync_ran:1%3Bexp-session$g_sync_ran:1%3Bexp-session$dc_event:1%3Bexp-session$device_category:desktop%3Bexp-session; bm_sv=6E7AD2752C6D934DE001BCDA3A0B4C10~YAAQj+XEF+tFCWKCAQAA/6FShRBvMiR1IfE7Ij2WZFtqND3dq7GxsbPQE24q7G406421i2CteEL59xrcIDxDIGJ6LLyQZNhxTikEQWD2HfUPUOOy8qxuD2i8nNwZo+X+0vgO62hQA5a5mkCaXiQTNi/8uYS+4jL7Sv/4E+32jmI4iyPTkqBxUYngd2cu2O2IfD7gDqy0YnQ3vPxVsyffaTIzPUeN2/CS5WJWoHEfXTGIe/Az409pWDUScL8l8Q==~1; metrics_tracker_session_manager=%7B%22session_id%22%3A%225FDB309D5632BC7884F8F7289A560691-187ac221-9f6b-4fbb-ba7f-1ea702fbc328%22%2C%22creation_time%22%3A1660094041678%2C%22visit_count%22%3A1%2C%22session_seq%22%3A220%2C%22idle_time%22%3A1660094161900%7D',
      'origin': 'https://www.hulu.com',
      'referer': 'https://www.hulu.com/',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'sec-gpc': '1',
    });

    for(let collectionID = 1; collectionID < 5000; collectionID++) {

      // Paginate Through Collections
      for(let ia = 0; true; ia++) {

        const index = await this.getJSON(`${this.local.Link.collection}${collectionID}?${new URLSearchParams(_.extend(this.local.defaultQuery, { offset: (this.local.limit * ia), limit: this.local.limit }))}`);

        // No content remaining in collection.
        try {
          if(index.items.length < 1) break;
        } catch(err) {
          break;
        }
        

        console.log("Collection [ Name: %s, Id %s ]", index.name, collectionID);

        for(const e of index.items) {
        
          try {

            // Only add movies
            if(e.metrics_info.target_type !== "movie")
              continue;

            let movie = {
              Title: e.visuals.headline,
              Description: e.visuals.body,
              Year: moment(e.entity_metadata.premiere_date).format("YYYY"),
              ReleaseDate: moment(e.entity_metadata.premiere_date).format("YYYY-MM-DD"),
              Link: `https://www.hulu.com/movie/${e.metrics_info.target_id}`,
              RetrieveImage: async function(self) {

                // Sleep Function
                async function sleep(millis) {
                  return new Promise(resolve => setTimeout(resolve, millis));
                }

                const link = `${e.visuals.artwork.horizontal_tile.image.path}&operations=${encodeURIComponent('[{"resize":"1600x1600|max"},{"format":"jpeg"}]')}`

                do { // Hulu as a weird CDN where it takes a minute to generate images.

                  const resp = await self.get(link);

                  if(resp.status == 200) {
                    return await resp.arrayBuffer();
                  } else if (resp.status == 408) {
                    await sleep(5000);
                    continue;
                  } else {
                    throw("Error Retrieving Image", resp.status);
                  }

                } while(true);

              }
            }

            // Set Rating if available.
            try { movie.Rating = e.actions.playback.bundle.rating.code; } catch(err) {}

            await this.addMovie(movie);

          } catch(err) {

            console.error("Error Adding Movie", err);
            console.dir(e, { depth: null });


          }
        }
      }
    }
  }

}