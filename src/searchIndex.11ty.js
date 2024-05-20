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
            who: item.data.who,
            image_upload: item.data.image_upload,
            image: item.data.image
        }));

    return JSON.stringify(items, null, 2);
};