import type { userToken} from "../utils/token.js";

declare global{
    namespace Express{
        interface Request{
           user?:userToken
           id?:userToken
        }
    }
}

export {}