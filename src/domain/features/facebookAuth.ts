import { type AccessToken } from "@/domain/models/accessToken"
import { type AuthenticationError } from "@/domain/errors"

export interface FacebookAuth {
  perform: (params: FacebookAuth.Params) => Promise<FacebookAuth.Result>
}

export namespace FacebookAuth {
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthenticationError

}
