const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets/img");
    eleventyConfig.addPassthroughCopy("assets/css");
    eleventyConfig.addPassthroughCopy("admin");

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

