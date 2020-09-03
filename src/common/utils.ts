import { Event } from './model/Event';
import { initialEvents } from './data/data';
import { QueryParams } from './model/QueryParams';

export const isObjectEmpty = (obj: object): boolean => {
  return obj === null || undefined
    ? true
    : (() => {
        for (const prop in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            return false;
          }
        }
        return true;
      })();
};

export const listEvents = (query?: QueryParams): Event[] => {
  if (isObjectEmpty(query as object)) {
    return initialEvents;
  }

  let result: Event[] = [...initialEvents];
  if (query && query.keyword) {
    result = initialEvents.filter(
      (value) =>
        value.Title &&
        value.Title.toLowerCase().indexOf(query.keyword!.toLowerCase()) >= 0
    );
  }

  if (query && query.city) {
    result = result.filter(
      (value) =>
        value.Location &&
        value.Location.City &&
        value.Location.City.toLowerCase() === query.city!.toLowerCase()
    );
  }

  if (query && query.state) {
    result = result.filter(
      (value) =>
        value.Location &&
        value.Location.State &&
        value.Location.State.toLowerCase() === query.state!.toLowerCase()
    );
  }

  if (query && query.country) {
    result = result.filter(
      (value) =>
        value.Location &&
        value.Location.Country &&
        value.Location.Country.toLowerCase() === query.country!.toLowerCase()
    );
  }

  if (query && query.date) {
    result = result.filter(
      (value) =>
        value &&
        value.Time &&
        new Date(value.Time).toDateString() ===
          new Date(query.date!).toDateString()
    );
  }

  return result;
};

export const getEventByIndex = (index: number): Event => {
  return initialEvents[index];
};
