// jest.setup.ts

// Silence les logs pour des tests plus propres
beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation((...args) => {
      const [first] = args;
      // Affiche uniquement les erreurs sérieuses, sinon commente cette condition
      if (
        typeof first === 'string' &&
        first.includes('UnhandledPromiseRejectionWarning')
      ) {
        return;
      }
      // console.error(...args); // décommente pour debugger ponctuellement
    });
  });
  
  // Ex. de mock global JWT (si tu n’as pas de __mocks__ séparé)
  jest.mock('jsonwebtoken', () => ({
    sign: () => 'mocked_token',
    verify: (token: string) => {
      if (token === 'mocked_token') return { id: 'mockedUserId' };
      throw new Error('Invalid token');
    },
  }));
  
  // Tu peux ajouter ici d'autres mocks ou setup globaux (Timers, Date.now, etc.)
  