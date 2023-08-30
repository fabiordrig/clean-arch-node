import { AuthenticationError } from "@/domain/errors"
import { type LoadFacebookUserApi } from "@/data/contracts"
import { type FacebookAuth } from "@/domain/features"

export class FacebookAuthService {
  constructor(private readonly facebookApi: LoadFacebookUserApi) { }
  public async perform(params: FacebookAuth.Params): Promise<AuthenticationError> {
    await this.facebookApi.loadUser(params)
    return new AuthenticationError()
  }
}
