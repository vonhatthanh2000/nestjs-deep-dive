export const AuthService = jest.fn(() => ({
  register: jest.fn().mockResolvedValue({}),
  login: jest.fn().mockResolvedValue({}),
  getProfile: jest.fn().mockResolvedValue({}),
}));
