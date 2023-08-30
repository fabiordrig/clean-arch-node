import { AuthenticationError } from "@/domain/errors"
import { FacebookAuthService } from "@/data/services"
import { type LoadFacebookUserApi } from "@/data/contracts"
import { mock, type MockProxy } from "jest-mock-extended"

describe("FacebookAuthService", () => {
  let sut: FacebookAuthService
  let facebookApi: MockProxy<LoadFacebookUserApi>

  const token = "anyToken"

  beforeEach(() => {
    facebookApi = mock()
    sut = new FacebookAuthService(facebookApi)
  })

  it("should call LoadFacebookUserApi with correct params", async () => {
    await sut.perform({ token })

    expect(facebookApi.loadUser).toHaveBeenCalledWith({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it("should return authentication erro when LoadFacebookUserApi return undefined", async () => {
    facebookApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
