import axios from 'axios';

import { ADMIN_BASE_URL } from '@/config'

import playerMock from './mock/players/item'
import playerListMock from './mock/players/list'
import createPlayerMock from './mock/players/create'
import destroyPlayerMock from './mock/players/destroy'
import updatePlayerMock from './mock/players/update'

export default {
  loadPlayer (playerId) {
    return playerMock(playerId);
  },

  loadPlayers (page = 1, query) {
    return playerListMock(page, query);
  },

  createPlayer(params) {
    return createPlayerMock(params);
  },

  destroyPlayer(playerId) {
    return destroyPlayerMock(playerId);
  },

  updatePlayer(playerId, params) {
    return updatePlayerMock(playerId, params);
  }
}
