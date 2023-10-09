import { FacebookAccount } from "@/domain/models"

describe("FacebookAccount", () => {
  const fbData = {
    facebookId: "anyFbId",
    name: "anyFbName",
    email: "anyFbEmail"
  }

  it("should create with facebook data only", () => {
    const sut = new FacebookAccount(fbData)
    expect(sut).toEqual({
      facebookId: "anyFbId",
      name: "anyFbName",
      email: "anyFbEmail"
    })
  })

  it("should update name if its empty", () => {
    const sut = new FacebookAccount(fbData, {
      id: "anyId"
    })
    expect(sut).toEqual({
      id: "anyId",
      facebookId: "anyFbId",
      name: "anyFbName",
      email: "anyFbEmail"
    })
  })
  it("should not update name if its not empty", () => {
    const sut = new FacebookAccount(fbData, {
      id: "anyId",
      name: "anyName"
    })
    expect(sut).toEqual({
      id: "anyId",
      facebookId: "anyFbId",
      name: "anyName",
      email: "anyFbEmail"
    })
  })
  it("should update name if its not empty", () => {
    const sut = new FacebookAccount(fbData, {
      id: "anyId",
      name: "anyName"
    })

    sut.updateWithFacebook({
      name: "newName",
      email: "newEmail",
      facebookId: "newFbId"
    })
    expect(sut).toEqual({
      id: "anyId",
      facebookId: "newFbId",
      name: "newName",
      email: "newEmail"
    })
  })
})
