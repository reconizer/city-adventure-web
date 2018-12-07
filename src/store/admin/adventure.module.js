import api from '@/api';

import adventureBuilder from '@/store/shared/adventure.builder.js'

let baseAdventure = adventureBuilder(api.admin);

export default baseAdventure;
