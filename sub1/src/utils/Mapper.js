const mapSongListEntityToModel = (entity) => ({
  id: entity.id,
  title: entity.title,
  performer: entity.performer,
});

const mapSongEntityToModel = (entity) => ({
  id: entity.id,
  title: entity.title,
  year: entity.year,
  duration: entity.duration,
  performer: entity.performer,
  genre: entity.genre,
  insertedAt: entity.inserted_at,
  updatedAt: entity.updated_at,
});

module.exports = {mapSongEntityToModel, mapSongListEntityToModel};
