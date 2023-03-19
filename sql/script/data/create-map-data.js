const createMapData = (data) => data
  .reduce((prevMap, map, i) => ({
    ...prevMap,
    [map]: i + 1,
  }), {});

module.exports = createMapData;
