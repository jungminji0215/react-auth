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

  async signOut() {
    await api.post('/api/signout');
  },

  async getMe() {
    console.log('Get me');
    const { data } = await api.get('/api/me');
    console.log('data get me : ', data);

    return data;
  },

  async getSession() {
    const { data } = await api.get('/api/session');
    console.log('data : ', data);
    return data;
  },

  async refreshAccessToken() {
    const { data } = await api.get('/api/refreshToken');

    return data;
  },
};
