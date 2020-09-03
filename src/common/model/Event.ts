import { Location } from './Location';
import { Seat } from './Seat';
export type Event = {
  Title: string;
  Time: string;
  Image: string;
  Location: Location;
  AvailableSeats?: Seat[];
};
