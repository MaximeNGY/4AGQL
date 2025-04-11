export const sign = () => 'mocked_token';

export const verify = (token: string) => {
  if (token === 'mocked_token') return { id: 'mockedUserId' };
  throw new Error('Invalid token');
};
