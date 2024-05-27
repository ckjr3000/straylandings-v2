const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/admin/config.yml");
    
    // Format date 
    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    })

    // Get authors collection
    eleventyConfig.addCollection('authors', function(collection) {
      const authorsData = require('./src/_data/authors.json');
      return authorsData.authors;
    });

    eleventyConfig.setTemplateFormats(["11ty.js","html", "md"]);

    return {
      dir: {
          input: "src",
          output: "_site"
      }
    }
  };

