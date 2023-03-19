const createUserImageData = (data, map) => {
  const insertionImageRows = data
    .map(({ profileImg, userId }) => profileImg
      .map((y) => `(${[userId]}, ${map[y]})`))
    .flat()
    .join(',\n');

  const userImageQuery = `
insert into user_image (user_id, image_id) values
${insertionImageRows};
`;

  return userImageQuery;
};

module.exports = createUserImageData;
