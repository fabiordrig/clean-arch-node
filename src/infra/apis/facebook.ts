import { type LoadFacebookUserApi } from "@/data/contracts/api"
import { type HttpClient } from "@/infra/http/client"

export class FacebookApi {
  private readonly BASE_URL = "https://graph.facebook.com"
  constructor(private readonly httpClient: HttpClient,
    private readonly clientId: string,
    private readonly clientSecret: string
  ) { }

  async loadUser(params: LoadFacebookUserApi.Params): Promise<void> {
    await this.httpClient.get({
      url: `${this.BASE_URL}/oauth/access_token`,
      params: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: "client_credentials"
      }
    })
  }
}
