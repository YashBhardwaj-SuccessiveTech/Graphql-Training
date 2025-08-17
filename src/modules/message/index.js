import {messageQueryResolvers } from "./query.js"
import {messageMutationResolvers} from "./mutation.js"

export const messageModule = {
    Query: messageQueryResolvers,
    Mutation: messageMutationResolvers
}

 