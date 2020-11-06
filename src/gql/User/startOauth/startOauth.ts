import { PubSub, withFilter } from "apollo-server";
import { IResolvers } from "graphql-tools";

const pubsub = new PubSub();
const START_OAUTH = "START_OAUTH";
const subscription: IResolvers = {
  Subscription: {
    startOAuth: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([START_OAUTH]),
        (payload, args) => {
          console.log(payload);
          return payload.startOAuth.socketId === args.socketId;
        }
      ),
    },
  },
};

export default subscription;
