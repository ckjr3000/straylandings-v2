const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets/img");
    eleventyConfig.addPassthroughCopy("src/assets/css");
    eleventyConfig.addPassthroughCopy("src/admin/config.yml");

      // Format date 
      eleventyConfig.addFilter("postDate", (dateObj) => {
          return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
      })

      return {
        dir: {
            input: "src",
            output: "_site"
        }
    }
  };

