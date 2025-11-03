import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: jest.fn().mockImplementation((fn) => fn),
}));
jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const mockedGet = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (axios.create as jest.Mock).mockImplementation(() => ({
      get: mockedGet,
    }));
  });

  test('should create instance with provided base url', async () => {
    mockedGet.mockResolvedValue({ data: {} });

    await throttledGetDataFromApi('/posts');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    mockedGet.mockResolvedValue({ data: {} });

    await throttledGetDataFromApi('/posts');
    expect(mockedGet).toHaveBeenCalledWith('/posts');
  });

  test('should return response data', async () => {
    mockedGet.mockResolvedValue({ data: { test: 'Test response' } });

    const result = await throttledGetDataFromApi('/posts');
    expect(result).toEqual({ test: 'Test response' });
  });
});
