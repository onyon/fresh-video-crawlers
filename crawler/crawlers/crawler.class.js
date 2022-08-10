import fetch    from 'node-fetch';
import _        from "underscore";
import Joi      from "joi";
import s3       from "@aws-sdk/client-s3";

const s3client = new s3.S3Client();

export default class Crawler {

  constructor(app) {

    this.app   = app;
    this.Media = {};

    return this;

  }

  async getMediaById(Id) {

    // Check to see if value is cached
    if(_.has(this.Media, Id)) {
      return this.Media[Id]
    }

    let [ res, fields ] = await this.app.db.query(this.app.db.format("SELECT * FROM Media WHERE Id = ? LIMIT 1", [ Id ]));
    if(res.length !== 1) {
      throw(`Invalid Media ID ${Id}`);
    }

    this.Media[res[0].Id] = res[0];
    return this.Media[res[0].Id];

  }

  // Add an item to Media table
  async addMovie(input) {

    let res;
    let fields;

    // Validate Input
    const schema = Joi.object({
      Title: Joi.string().min(1).max(255).required(),
      Description: Joi.any().required(),
      Year: Joi.number().integer().min(1900).max(2024).required(),
      ReleaseDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
      Link: Joi.string().uri({ scheme: ["http","https"]}).required(),
      RetrieveImage: Joi.any().required(),
      Slug: Joi.string().default(this.createSlug(`${input.Year}-${input.Title}`)),
      Medium: Joi.string().default("movie"),
      Image: Joi.string().default(`media/movies/${this.createSlug(`${input.Year}-${input.Title}`)}.jpg`),
      Rating: Joi.string().optional().default(null),
    });

    const movie = await schema.validateAsync(input);

    console.info("-- Processing Movie --\nTitle: %s\nYear: %s", movie.Title, movie.Year);

    // Check to see if movie exists
    [ res, fields ] = await this.app.db.query(this.app.db.format("SELECT * FROM Media WHERE Medium = ? AND Slug = ? LIMIT 1", [ movie.Medium, movie.Slug ]));
    if(res.length > 0) {

      movie.Id = res[0].Id;

      console.info("Movie Exists, ID: %s", movie.Id);

      await this.touch(movie);
      return movie;

    }

    // Check to see if the Description is a function.
    if(_.isFunction(movie.Description)) {
      movie.Description = await movie.Description(this);
    }

    // Download Image to S3
    await this.saveToS3(await movie.RetrieveImage(this), movie.Image);

    // Save to Database
    [ res, fields ] = await this.app.db.query(this.app.db.format("INSERT INTO Media SET ?", [ _.pick(movie, "Slug", "Title", "Description", "Year", "ReleaseDate", "Medium", "Image") ]));
    movie.Id = res.insertId;

    console.info("Movie Created, ID: %s", movie.Id);

    await this.touch(movie);
    return movie;

  }

  async addShow(input) {

    let res;
    let fields;

    // Validate Input
    const schema = Joi.object({
      Title: Joi.string().min(1).max(255).required(),
      Description: Joi.any().required(),
      Year: Joi.number().integer().min(1900).max(2024).required(),
      ReleaseDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
      Link: Joi.string().uri({ scheme: ["http","https"]}).required(),
      RetrieveImage: Joi.any().required(),
      Slug: Joi.string().default(this.createSlug(`${input.Year}-${input.Title}`)),
      Medium: Joi.string().default("tvShow"),
      Image: Joi.string().default(`media/shows/${this.createSlug(`${input.Year}-${input.Title}`)}.jpg`),
      Rating: Joi.string().optional().default(null),
    });

    const show = await schema.validateAsync(input);

    console.info("-- Processing Show --\nTitle: %s\nYear: %s", show.Title, show.Year);

    // Check to see if show exists
    [ res, fields ] = await this.app.db.query(this.app.db.format("SELECT * FROM Media WHERE Medium = ? AND Slug = ? LIMIT 1", [ show.Medium, show.Slug ]));
    if(res.length > 0) {

      show.Id = res[0].Id;

      console.info("Show Exists, ID: %s", show.Id);

      await this.touch(show);
      return show;

    }

    // Check to see if the Description is a function.
    if(_.isFunction(show.Description)) {
      show.Description = await show.Description(this);
    }

    // Download Image to S3
    await this.saveToS3(await show.RetrieveImage(this), show.Image);

    // Save to Database
    [ res, fields ] = await this.app.db.query(this.app.db.format("INSERT INTO Media SET ?", [ _.pick(show, "Slug", "Title", "Description", "Year", "ReleaseDate", "Medium", "Image") ]));
    show.Id = res.insertId;

    console.info("Show Created, ID: %s", show.Id);

    await this.touch(show);
    return show;

  }

  async addEpisode(input) {

    // Retrieve Parent
    let show = await this.getMediaById(input.Parent);

    let res;
    let fields;

    // Validate Input
    const schema = Joi.object({
      Title: Joi.string().min(1).max(255).required(),
      Description: Joi.any().required(),
      Year: Joi.number().integer().min(1900).max(2024).required(),
      ReleaseDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
      Link: Joi.string().uri({ scheme: ["http","https"]}).required(),
      RetrieveImage: Joi.any().required(),
      Slug: Joi.string().default(this.createSlug(`s${input.Season}e${input.Episode}-${input.Title}`)),
      Medium: Joi.string().default("tvEpisode"),
      Image: Joi.string().default(`media/shows/${show.Slug}/${this.createSlug(`s${input.Season}e${input.Episode}-${input.Title}`)}.jpg`),
      Season: Joi.number().integer().required(),
      Episode: Joi.number().integer().required(),
      Parent: Joi.number().integer().required(),
      Rating: Joi.string().default(null),
    });

    const episode = await schema.validateAsync(input);

    console.log("Processing Episode. [ Title: %s, Season: %s, Episode: %s ]", episode.Title, episode.Season, episode.Episode);

    // Check to see if episode exists
    [ res, fields ] = await this.app.db.query(this.app.db.format("SELECT * FROM Media WHERE Parent = ? AND Season = ? AND Episode = ? AND Medium = ? AND Slug = ? LIMIT 1", [ episode.Parent, episode.Season, episode.Episode, episode.Medium, episode.Slug ]));
    if(res.length > 0) {

      episode.Id = res[0].Id;

      console.info("Episode Exists, ID: %s", episode.Id);

      await this.touch(episode);
      return episode;

    }

    // Check to see if the Description is a function.
    if(_.isFunction(episode.Description)) {
      episode.Description = await episode.Description(this);
    }

    // Download Image to S3
    await this.saveToS3(await episode.RetrieveImage(this), episode.Image);

    // Save to Database
    [ res, fields ] = await this.app.db.query(this.app.db.format("INSERT INTO Media SET ?", [ _.pick(episode, "Slug", "Title", "Description", "Year", "ReleaseDate", "Medium", "Image", "Season", "Episode", "Parent") ]));
    episode.Id = res.insertId;

    console.info("Episode Created, ID: %s", episode.Id);

    await this.touch(episode);
    return episode;

  }

  // Touch an item showing it as last-seen
  async touch(media) {

    let i = {
      Provider: this.app.Provider.Id,
      Media: media.Id,
      Country: this.app.config.Country.Code,
      Link: media.Link,
      Rating: media.Rating,
    }

    await this.app.db.query(this.app.db.format("INSERT INTO ProviderRelationship SET ? ON DUPLICATE KEY UPDATE Seen = NOW()", [ i ]));

    console.info("Touched Media. [ Provider: %s, Media: %s, Country: %s, Link: %s ]", i.Provider, i.Media, i.Country, i.Link);

    return;

  }

  async get(url) {

    console.log("Requsting URL: %s", url);

    let resp = await fetch(url, {
      method: "GET",
      headers: this.app.config.Browser.Headers
    });

    return resp;

  }

  async getJSON(url) {

    const resp = await this.get(url);
    return await resp.json();

  }

  async getHTML(url) {

    const resp = await this.get(url);
    return await resp.text();

  }

  async getBuffer(url) {

    const resp = await this.get(url);
    return await resp.arrayBuffer();

  }

  async saveToS3(buffer, key) {

    const o = new s3.PutObjectCommand({ 
      Bucket: this.app.config.S3.Bucket,
      Key: key,
      Body: buffer,
      ContentType: "image/jpeg",
      Acl: this.app.config.S3.Acl,
      CacheControl: this.app.config.S3.CacheControl,
      StorageClass: this.app.config.S3.StorageClass
    });
    await s3client.send(o);

    return;

  }

  setHeaders(headerObject) {

    // Validate Input
    if(!_.isObject(headerObject)) {
      throw "Expecting Object";
    }

    this.app.config.Browser.Headers = _.extend(this.app.config.Browser.Headers, headerObject);
    return this;

  }

  createSlug(input) {

    let output = input.trim().toLowerCase().replaceAll(' ', '-').replace(/[^a-z0-9-]/gi, '');
    return output.replace(/--+/g, '-');

  }

}