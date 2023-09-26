import { AuthenticationError } from "@/domain/errors"
import { FacebookAuthService } from "@/data/services"
import { type LoadUserAccountRepository, type SaveFacebookAccountRepository } from "@/data/contracts/repos"
import { type LoadFacebookUserApi } from "@/data/contracts/api"
import { mock, type MockProxy } from "jest-mock-extended"
import { FacebookAccount } from "@/domain/models"
import { type TokenGenerator } from "@/data/contracts/crypto"

describe("FacebookAuthService", () => {
  let sut: FacebookAuthService
  let facebookApi: MockProxy<LoadFacebookUserApi>
  let crypto: MockProxy<TokenGenerator>
  let repository: MockProxy<LoadUserAccountRepository & SaveFacebookAccountRepository>

  const token = "anyToken"
  const facebookId = "anyFacebookId"
  const fbName = "anyFbName"
  const email = "anyEmail"
  const id = "anyId"

  beforeEach(() => {
    facebookApi = mock()
    facebookApi.loadUser.mockResolvedValue({
      facebookId,
      name: fbName,
      email
    })
    repository = mock()
    crypto = mock()
    repository.load.mockResolvedValue(undefined)
    repository.saveWithFacebook.mockResolvedValue({
      id
    })
    sut = new FacebookAuthService(facebookApi, repository, crypto)
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

    expect(repository.load).toHaveBeenCalledWith({ email })
    expect(repository.load).toHaveBeenCalledTimes(1)
  })

  it("should create account", async () => {
    await sut.perform({ token })

    expect(repository.saveWithFacebook).toHaveBeenCalledWith({
      email,
      name: fbName,
      facebookId
    })
    expect(repository.saveWithFacebook).toHaveBeenCalledTimes(1)
  })

  it("should call SaveFacebookAccountRepository with FacebookAccount", async () => {
    await sut.perform({ token })

    expect(repository.saveWithFacebook).toHaveBeenCalledWith(expect.any(FacebookAccount))
    expect(repository.saveWithFacebook).toHaveBeenCalledTimes(1)
  })

  it("should call TokenGenerator with correct params", async () => {
    await sut.perform({ token })

    expect(crypto.generateToken).toHaveBeenCalledWith({ key: id })
    expect(repository.saveWithFacebook).toHaveBeenCalledTimes(1)
  })
})
