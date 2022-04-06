const cheerio = require("cheerio");
const request = require("request");
const htmlOne = require("html");

const serve = (req, res) => {
  console.log(req.body);
  request(req.body.link, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      const x = $("article").html();
      const y = htmlOne.prettyPrint(x , {indent_size : 2});
      console.log(y);
      res.send(y);
    }
  });
};

module.exports = { serve };
