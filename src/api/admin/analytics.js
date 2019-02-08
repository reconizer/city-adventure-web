import axios from 'axios';

import { BASE_URL } from '@/config';

import overviewSummaryMock from './mock/analytics/overview_summary';
import purchasesMock from './mock/analytics/purchasing';
import viewsMock from './mock/analytics/views';
import ratingsMock from './mock/analytics/ratings';

import participantsMock from './mock/analytics/participants';
import rankingsMock from './mock/analytics/rankings';
import tipUsageMock from './mock/analytics/tip_usage';
import timeSpentPerPointMock from './mock/analytics/time_spent_per_point';
import wrongPasswordEntiresMock from './mock/analytics/wrong_password_entries';

export default {
  overview: {
    summary (adventureId, startDate, endDate) {
      return overviewSummaryMock(adventureId, startDate, endDate);
    },

    purchases (adventureId, startDate, endDate) {
      return purchasesMock(adventureId, startDate, endDate);
    },

    views (adventureId, startDate, endDate) {
      return viewsMock(adventureId, startDate, endDate);
    },

    ratings (adventureId, startDate, endDate) {
      return ratingsMock(adventureId, startDate, endDate);
    }
  },

  userCompletion: {
    participants (adventureId, startDate, endDate) {
      return participantsMock(adventureId, startDate, endDate);
    },
    rankings (adventureId, startDate, endDate) {
      return rankingsMock(adventureId, startDate, endDate);
    }
  },

  userProgress: {
    tipUsage (adventureId, startDate, endDate) {
      return tipUsageMock(adventureId, startDate, endDate);
    },
    timeSpentPerPoint (adventureId, startDate, endDate) {
      return timeSpentPerPointMock(adventureId, startDate, endDate);
    },
    wrongPasswordEntires (adventureId, startDate, endDate) {
      return wrongPasswordEntiresMock(adventureId, startDate, endDate);
    }
  }
}
