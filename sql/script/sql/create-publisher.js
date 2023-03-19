const publisherFromGames = (map) => [...new Set(map
  .map((x) => x.information.publisher).flat())];

const createPublisherData = (data) => {
  const publisherData = publisherFromGames(data);

  const injectPublisher = publisherData
    .map((x) => `('${x}')`)
    .flat()
    .join(',\n');

  const publisherQuery = `insert into publisher (publisher) values
${injectPublisher};
`;

  return publisherQuery;
};

module.exports = {
  createPublisherData,
  publisherFromGames,
};
