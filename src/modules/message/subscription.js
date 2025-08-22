import { subscribe } from "graphql";
import { pubsub } from "../../server/pubsub.js"

export const messageSubscriptionResolvers={
    messagePosted: {
        subscribe: ()=> pubsub.asyncIterableIterator(["MESSAGE_POSTED"])
    },

    userstatuschanged: {
        subscribe: ()=> pubsub.asyncIterableIterator(["USER_STATUS_CHANGED"])
    }
};
