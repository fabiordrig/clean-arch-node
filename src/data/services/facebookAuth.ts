import { AuthenticationError } from "@/domain/errors"
import { type LoadFacebookUserApi } from "@/data/contracts/api"
import { type FacebookAuth } from "@/domain/features"
import { type SaveFacebookAccountRepository, type LoadUserAccountRepository } from "@/data/contracts/repos"

export class FacebookAuthService {
  constructor(
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly repository: LoadUserAccountRepository & SaveFacebookAccountRepository
  ) { }

  public async perform(params: FacebookAuth.Params): Promise<AuthenticationError> {
    const response = await this.facebookApi.loadUser(params)

    if (response) {
      const accountData = await this.repository.load({ email: response.email })

      await this.repository.saveWithFacebook({
        id: accountData?.id,
        name: accountData?.name ?? response.name,
        email: response.email,
        facebookId: response.facebookId
      })
    }
    return new AuthenticationError()
  }
}
