import { type MockProxy, mock } from "jest-mock-extended"
import { FacebookApi } from "@/infra/apis/facebook"
import { type HttpClient } from "@/infra//http/client"

describe("FacebookApi", () => {
  const token = "anyToken"
  const clientId = "anyClientId"
  const clientSecret = "anyClientSecret"
  const grantType = "client_credentials"

  let sut: FacebookApi
  let httpClient: MockProxy<HttpClient>

  beforeAll(() => {
    httpClient = mock()
  })

  beforeEach(() => {
    sut = new FacebookApi(httpClient, clientId, clientSecret)
  })

  it("should get app token", async () => {
    await sut.loadUser({
      token
    })

    expect(httpClient.get).toHaveBeenCalledWith({
      url: "https://graph.facebook.com/oauth/access_token",
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: grantType
      }
    })
  })
})
