module.exports.data = {
    permalink: `/searchIndex.json`,
    eleventyExcludeFromCollections: true,
  };
  
  module.exports.render = (data) => {
    const items = data.collections.all
      .filter((item) => !item.eleventyExcludeFromCollections)
      .map((item) => ({
        title: item.data.title,
        url: item.url,
        date: item.date,
        content: item.templateContent,
      }));
  
    // Wrap the items array in an object with a key, for example, `items`
    const output = {
      items: items,
    };
  
    return JSON.stringify(output, null, 2);
  };
  