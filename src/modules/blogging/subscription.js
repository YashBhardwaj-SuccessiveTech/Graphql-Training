import { pubsub } from "../../server/pubsub.js";

export const blogSubscriptionResolvers = {
    commentposted: {
        subscribe: ()=> pubsub.asyncIterableIterator(["COMMENT_POSTED"])
    }
}
