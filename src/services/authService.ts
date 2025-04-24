import api from '../api/axios.ts';

export const authService = {
  async signIn(email: string, password: string) {
    const { data } = await api.post('/api/signin', { email, password });
    return data;
  },

  async signUp(email: string, password: string) {
    const { data } = await api.post('/api/signup', { email, password });
    return data;
  },

  async getMe() {
    const { data } = await api.get('/api/me');
    return data;
  },

  async refreshAccessToken() {
    const { data } = await api.post('/api/refreshToken');
    return data.accessToken;
  },
};
