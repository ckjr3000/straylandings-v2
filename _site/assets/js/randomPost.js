module.exports = function(collection) {
    const randomIndex = Math.floor(Math.random() * collection.length);
    return collection[randomIndex];
};
