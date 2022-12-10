import { getHiddenText } from '../utils';

describe('ChannelRow', () => {
  describe('getHiddenText', () => {
    const testCases = [
      {
        text: 'This text should be cut to the word - test',
        expected: 'test',
        maxlenght: 39,
      },
      {
        text: 'This text should be cut to nothingt',
        expected: '',
        maxlenght: 100,
      },
    ];

    testCases.map((test, index) => {
      describe(`${index}`, () => {
        it('Should return hidden text started with space, if visible text is ends with space', () => {
          const actual = getHiddenText(test.text, test.maxlenght);

          expect(actual).toBe(test.expected);
        });
      });
    });
  });
});
