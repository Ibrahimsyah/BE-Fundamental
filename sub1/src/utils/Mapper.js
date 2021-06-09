const mapSongEntityToModel = (entity) => ({
  id: entity.id,
  title: entity.title,
  performer: entity.performer,
});

module.exports = {mapSongEntityToModel};
