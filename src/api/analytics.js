import axios from 'axios';

import { BASE_URL } from '@/config';

import purchasesMock from './mock/analytics_purchasing';
import viewsMock from './mock/analytics_views';
import ratingsMock from './mock/analytics_ratings';

export default {
  purchases (adventureId, startDate, endDate) {
    return purchasesMock(adventureId, startDate, endDate);
  },

  views (adventureId, startDate, endDate) {
    return viewsMock(adventureId, startDate, endDate);
  },
  
  ratings (adventureId, startDate, endDate) {
    return ratingsMock(adventureId, startDate, endDate);
  }
}
