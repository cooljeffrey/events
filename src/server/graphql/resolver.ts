import { listEvents, getEventByIndex } from '../../common/utils';
import { QueryParams } from '../../common/model/QueryParams';

export const resolvers = {
  Query: {
    listEvents: (_parent: any, args: QueryParams, context: any, info: any) => {
      return listEvents({ ...args });
    },
    getEventByIndex: (
      _parent: any,
      args: { index: number },
      context: any,
      info: any
    ) => {
      return getEventByIndex(args.index);
    },
  },
};
