import { type AccessToken } from "@/domain/models/access-token"
import { type AuthenticationError } from "@/domain/errors"

export interface FacebookAuth {
  perform: (params: FacebookAuth.Params) => Promise<FacebookAuth.Result>
}

namespace FacebookAuth {
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthenticationError

}