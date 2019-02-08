import api from '@/api';

import authenticationBuilder from '@/store/shared/authentication.builder'

let baseAuthentication = authenticationBuilder(api.admin);

export default baseAuthentication;
