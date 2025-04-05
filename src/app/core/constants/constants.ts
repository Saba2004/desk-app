const apiUrl = 'https://67e184db58cc6bf785262dee.mockapi.io';

export const EndPoint = {
  Auth: {
    Register: `${apiUrl}/register`,
    Login: `${apiUrl}/login`,
  },
  Incidents: `${apiUrl}/incidents`,
  Tragedies: `${apiUrl}/tragedies`,
  Heroes: `${apiUrl}/hero`,
};

export const LocalStorage = {
  token: 'USER_TOKEN',
  incidents: 'INCIDENTS',
  tragedies: 'TRAGEDIES',
  heroes: 'HEROES',
};
