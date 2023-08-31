import { AuthenticationError } from "@/domain/errors"
import { FacebookAuthService } from "@/data/services"
import { type LoadUserAccountRepository } from "@/data/contracts/repos"
import { type LoadFacebookUserApi } from "@/data/contracts/api"
import { mock, type MockProxy } from "jest-mock-extended"

describe("FacebookAuthService", () => {
  let sut: FacebookAuthService
  let facebookApi: MockProxy<LoadFacebookUserApi>
  let loadUserAccountRepo: MockProxy<LoadUserAccountRepository>

  const token = "anyToken"
  const facebookId = "anyFacebookId"
  const name = "anyName"
  const email = "anyEmail"

  beforeEach(() => {
    facebookApi = mock()
    facebookApi.loadUser.mockResolvedValue({
      facebookId,
      name,
      email
    })
    loadUserAccountRepo = mock()
    sut = new FacebookAuthService(facebookApi, loadUserAccountRepo)
  })

  it("should call LoadFacebookUserApi with correct params", async () => {
    await sut.perform({ token })

    expect(facebookApi.loadUser).toHaveBeenCalledWith({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it("should return authentication error when LoadFacebookUserApi return undefined", async () => {
    facebookApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  it("should return LoadUserAccountRepo return data", async () => {
    await sut.perform({ token })

    expect(loadUserAccountRepo.load).toHaveBeenCalledWith({ email })
    expect(loadUserAccountRepo.load).toHaveBeenCalledTimes(1)
  })
})
