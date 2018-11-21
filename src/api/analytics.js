import axios from 'axios';

import { BASE_URL } from '@/config';

import purchasesMock from './mock/adventure_purchasing';

export default {
  purchases (adventureId, startDate, endDate) {
    return purchasesMock(adventureId, startDate, endDate);
  }
}
