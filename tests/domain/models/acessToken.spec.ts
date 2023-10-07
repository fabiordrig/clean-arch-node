import { AccessToken } from "@/domain/models"

describe("AccessToken", () => {
  it("should create with a value", () => {
    const sut = new AccessToken("anyValue")

    expect(sut).toEqual({
      value: "anyValue"
    })
  })
  it("should expire in 1800000 ms", () => {
    expect(AccessToken.expirationInMs).toBe(1800000)
  })
})
