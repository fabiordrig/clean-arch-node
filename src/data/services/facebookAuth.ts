import { AuthenticationError } from "@/domain/errors"
import { type LoadFacebookUserApi } from "@/data/contracts/api"
import { type FacebookAuth } from "@/domain/features"
import { type CreateFacebookAccountRepository, type LoadUserAccountRepository } from "@/data/contracts/repos"

export class FacebookAuthService {
  constructor(
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly repository: LoadUserAccountRepository & CreateFacebookAccountRepository
  ) { }

  public async perform(params: FacebookAuth.Params): Promise<AuthenticationError> {
    const response = await this.facebookApi.loadUser(params)

    if (response) {
      await this.repository.load({ email: response.email })
      await this.repository.createFromFacebook(response)
      return new AuthenticationError()
    }
    return new AuthenticationError()
  }
}
