import fetch from 'cross-fetch';
import server from './tests/server';
import '@testing-library/jest-dom';

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

global.fetch = fetch;