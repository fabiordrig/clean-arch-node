import { AuthenticationError } from "@/domain/errors"
import { type LoadFacebookUserApi } from "@/data/contracts/api"
import { type FacebookAuth } from "@/domain/features"
import { type LoadUserAccountRepository } from "@/data/contracts/repos"

export class FacebookAuthService {
  constructor(
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly loadUserAccountRepo: LoadUserAccountRepository
  ) { }

  public async perform(params: FacebookAuth.Params): Promise<AuthenticationError> {
    const response = await this.facebookApi.loadUser(params)

    if (!response) {
      return new AuthenticationError()
    }
    await this.loadUserAccountRepo.load({ email: response.email })
    return new AuthenticationError()
  }
}
