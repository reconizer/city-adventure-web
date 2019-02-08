import api from '@/api'

import analyticsBuilder from '@/store/shared/analytics.builder.js'

let baseAnalytics = analyticsBuilder(api.creator);

export default baseAnalytics;
