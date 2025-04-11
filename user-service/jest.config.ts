import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  detectOpenHandles: true,
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // si besoin plus tard
};

export default config;
