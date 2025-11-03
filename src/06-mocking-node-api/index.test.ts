import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 1000);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 1000);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(3);

    jest.advanceTimersByTime(5000);
    expect(callback).toHaveBeenCalledTimes(8);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    (join as jest.Mock).mockReturnValue('text.txt');

    await readFileAsynchronously('text.txt');
    expect(join).toHaveBeenCalledWith(__dirname, 'text.txt');
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously('text.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockedContent = "It's content to test file";
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from(mockedContent));
    const result = await readFileAsynchronously('text.txt');
    expect(result).toBe(mockedContent);
  });
});
