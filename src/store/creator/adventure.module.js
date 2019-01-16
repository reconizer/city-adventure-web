import api from '@/api';

import adventureBuilder from '@/store/shared/adventure.builder.js'

let baseAdventure = adventureBuilder(api.creator);

export default baseAdventure;
