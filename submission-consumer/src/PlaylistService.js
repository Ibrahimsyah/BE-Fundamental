const { Pool } = require('pg');

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getUserPlaylist(userId){
    const query = {
        text:
        `
        select p."id", p."name" , u.username from users u 
        inner join playlists p on p."owner" = u.id 
        where u.id = $1
        union 
        select p2."name",  p2."name" , u3.username from users u2 
        inner join collaborations c on c.user_id  = u2.id 
        inner join playlists p2 on p2.id = c.playlist_id
        inner join users u3 on u3.id = p2."owner"
        where u2.id  = $1
        `,
        values: [userId],
      };
      const result = await this._pool.query(query);
  
      return result.rows;
    }
  
}

module.exports = PlaylistService