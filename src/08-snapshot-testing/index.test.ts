import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const elements = [1, 2, 3];

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const mockedLinkedList = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: { value: null, next: null },
        },
      },
    };
    expect(generateLinkedList(elements)).toStrictEqual(mockedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(elements)).toMatchSnapshot();
  });
});
