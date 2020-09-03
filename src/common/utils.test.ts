import { listEvents } from './utils';
import { initialEvents } from './data/data';

test('should return expected events', () => {
  expect(listEvents()).toBe(initialEvents);
  expect(listEvents({ keyword: 'place' })).toStrictEqual(initialEvents);
  expect(listEvents({ keyword: 'non-exist' })).toStrictEqual([]);
  expect(listEvents({ city: 'Melbourne' })).toStrictEqual([]);
  expect(listEvents({ city: 'Brisbane' })).toStrictEqual([
    {
      Title: 'Place 1',
      Time: '2018-07-22T02:30:00.000Z',
      Image: 'http://example.com/image.png',
      Location: {
        City: 'Brisbane',
        State: 'Queensland',
        Country: 'Australia',
      },
    },
  ]);
  expect(listEvents({ state: 'Victoria' })).toStrictEqual([]);
  expect(listEvents({ state: 'Queensland' })).toStrictEqual(initialEvents);
  expect(listEvents({ country: 'US' })).toStrictEqual([]);
  expect(listEvents({ country: 'Australia' })).toStrictEqual(initialEvents);
  expect(listEvents({ date: '2018-07-22' })).toStrictEqual([
    {
      Title: 'Place 1',
      Time: '2018-07-22T02:30:00.000Z',
      Image: 'http://example.com/image.png',
      Location: {
        City: 'Brisbane',
        State: 'Queensland',
        Country: 'Australia',
      },
    },
  ]);
  expect(
    listEvents({ city: 'Brisbane', country: 'Australia', date: '2018-07-22' })
  ).toStrictEqual([
    {
      Title: 'Place 1',
      Time: '2018-07-22T02:30:00.000Z',
      Image: 'http://example.com/image.png',
      Location: {
        City: 'Brisbane',
        State: 'Queensland',
        Country: 'Australia',
      },
    },
  ]);
  expect(listEvents({ city: 'Gold Coast', keyword: 'place 8' })).toStrictEqual([
    {
      Title: 'Place 8',
      Time: '2018-07-24T02:30:00.000Z',
      Image: 'http://example.com/image.png',
      Location: {
        City: 'Gold Coast',
        State: 'Queensland',
        Country: 'Australia',
      },
      AvailableSeats: [
        {
          id: 'W25',
        },
        {
          id: 'B29',
        },
      ],
    },
  ]);
});
