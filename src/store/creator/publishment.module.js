import api from '@/api'

import publishmentBuilder from '@/store/shared/publishment.builder.js'

import { MESSAGE_COMMENT_CREATOR } from '@/config'

let basePublishment = publishmentBuilder(api.creator, MESSAGE_COMMENT_CREATOR);

export default basePublishment;
