import api from '@/api';

import adventureBuilder from '@/store/shared/adventure.builder.js'

let baseAdventure = adventureBuilder(api.admin);

export default Object.assign(baseAdventure, {
  getters: {
    ...baseAdventure.getters,
    editable: () => {
      return true;
    }
  }
});
