const fs = require("fs");

function getRandomCategory(callback) {
  fs.readFile("categories.json", "utf8", (err, response) => {
    if (err) {
      callback(err);
    } else {
      try {
        const categories = JSON.parse(response);
        const randomCategory =
          categories[Math.floor(Math.random() * categories.length)];
        callback(null, randomCategory);
      } catch (parseError) {
        callback(parseError);
      }
    }
  });
}

module.exports = getRandomCategory;
