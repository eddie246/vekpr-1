import { Request, Response, NextFunction } from 'express';

const fetch = require('node-fetch');
const { SPOTIFY_TOKEN } = require('../env.ts');
class PlaylistController {
  async getPlaylist(req: Request, res: Response, next: NextFunction) {
    const rawData = await fetch(
      `https://api.spotify.com/v1/playlists/${req.params.id}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + SPOTIFY_TOKEN,
        },
      }
    );

    res.locals.playlist = await rawData.json();

    next();
  }
}

const playlistController = new PlaylistController();

export default playlistController;
