const request = require("request");
const apiKey = require("./config");
const getRandomCategory = require("./random_cat");

getRandomCategory((error, category) => {
  if (error) {
    console.error("Error:", error);
  } else {
    const random_category = category;
    request.get(
      {
        url: `https://api.api-ninjas.com/v1/quotes?category=${random_category}`,
        headers: {
          "X-Api-Key": apiKey.apiKey,
        },
      },
      function (error, response, body) {
        if (error) {
          console.error("Request failed:", error);
        } else if (response.statusCode !== 200) {
          console.error("Error:", response.statusCode);
        } else {
          const Quote = JSON.parse(body)[0];
          module.exports = Quote;
          console.log(Quote);
        }
      }
    );
  }
});
