const cheerio = require("cheerio");
const request = require("request");

const serve = (req, res) => {
  console.log(req.body);
  request(req.body.link, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      const x = $("article").find(".responsive-tabs");
      res.send(x.text());
    }
  });
};

module.exports = { serve };
