import { AuthenticationError } from "@/domain/errors"
import { type LoadFacebookUserApi } from "@/data/contracts/api"
import { type FacebookAuth } from "@/domain/features"
import { type SaveFacebookAccountRepository, type LoadUserAccountRepository } from "@/data/contracts/repos"
import { AccessToken, FacebookAccount } from "@/domain/models"
import { type TokenGenerator } from "@/data/contracts/crypto"

export class FacebookAuthService implements FacebookAuth {
  constructor(
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly repository: LoadUserAccountRepository & SaveFacebookAccountRepository,
    private readonly crypto: TokenGenerator
  ) { }

  public async perform(params: FacebookAuth.Params): Promise<FacebookAuth.Result> {
    const response = await this.facebookApi.loadUser(params)
    if (response) {
      const accountData = await this.repository.load({ email: response.email })

      const facebookAccount = new FacebookAccount(response, accountData)

      facebookAccount.updateWithFacebook(response)

      const { id } = await this.repository.saveWithFacebook(facebookAccount)

      const token = await this.crypto.generateToken({ key: id, expirationInMs: AccessToken.expirationInMs })
      return new AccessToken(token)
    }
    return new AuthenticationError()
  }
}
