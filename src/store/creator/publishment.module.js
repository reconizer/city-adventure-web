import api from '@/api'

import publishmentBuilder from '@/store/shared/publishment.builder.js'

let basePublishment = publishmentBuilder(api.creator);

export default basePublishment;
